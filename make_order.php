<?php
/*
Copyright (c) 2016 Shpilevoy Vladislav <vshpilevoi@mail.ru>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
	include_once('utils.php');
	$name = strtolower($db_connection->real_escape_string($_POST['name']));
	$phone = strtolower($db_connection->real_escape_string($_POST['phone']));
	$email = strtolower($db_connection->real_escape_string($_POST['email']));
	if (strlen($name) == 0) {
		echo json_encode(['warning' => 'Имя не может быть пустым']);
		exit();
	}
	if (strlen($phone) == 0) {
		echo json_encode(['warning' => 'Телефон не может быть пустым']);
		exit();
	}
	$all_rings = json_decode($_POST['content'], true);
	if ($all_rings === NULL) {
		echo json_encode(['warning' => 'Ошибка ввода данных']);
		exit();
	}
	$all_packs = json_decode($_POST['packs'], true);
	if ($all_packs === NULL) {
		echo json_encode(['warning' => 'Ошибка ввода данных по пакетам']);
		exit();
	}
	$all_discs = json_decode($_POST['discounts'], true);
	if ($all_discs === NULL) {
		echo json_encode(['warning' => 'Ошибка ввода данных по скидкам']);
		exit();
	}
	$walk_through_rings = function($callback) {
		global $all_rings;
		for ($i = 0, $len = count($all_rings); $i < $len; ++$i) {
			$ring = $all_rings[$i];
			$res = $callback($ring);
			if ($res !== true) {
				return $res;
			}
		}
		return true;
	};
	$all_rings_count = 0;
	$rc = $walk_through_rings(function($ring) {
		global $all_rings_count;
		//validator
		if ($ring['size'] < min_ring_size) {
			return 'Минимальный размер кольца: '.min_ring_size;
		}
		if ($ring['count'] < 1) {
			return 'Нельзя выбрать 0 и меньше нуля колец';
		}
		if ($ring['count'] > max_rings_count) {
			return 'Нельзя выбрать колец более '.max_rings_count;
		}
		$all_rings_count += $ring['count'];
		global $ring_materials;
		if (!in_array($ring['material'], $ring_materials)) {
			return 'Материала "'.$ring['material'].'" нет в наличии';
		}
		global $ring_types;
		if (!in_array($ring['type'], $ring_types)) {
			return 'Кольца "'.$ring['material'].'" нет в наличии';
		}
		return true;
	});
	if ($rc !== true) {
		echo json_encode(['warning' => $rc]);
		exit();
	}
	if ($all_rings_count > max_rings_count) {
		echo json_encode(['warning' => 'Нельзя выбрать колец более '.max_rings_count]);
		exit();
	}
	if (strlen($email) == 0) $email = 'NULL';
	else $email = "'$email'";

	//------------------------------------------------------BEGIN TRANSACTION
	$rc = $db_connection->autocommit(false);
	if (!$rc) {
		echo json_encode(['error' => mysqli_error($db_connection)]);
		exit();
	}

	$rc = $db_connection->query("INSERT INTO preorders(name, phone, email)".
		" VALUES ('$name', '$phone', $email)");

	if (!$rc) {
		if (mysqli_errno($db_connection) == 1062) { //error duplicate rows
			echo json_encode(['warning' => 'Предзаказ с такими '.
				'телефоном и почтой уже существует']);
			$db_connection->rollback();
			exit();
		}
		echo json_encode(['error' => mysqli_error($db_connection)]);
		$db_connection->rollback();
		exit();
	}
	$insert_id = $db_connection->insert_id;
	$rc = $walk_through_rings(function($ring) {
		global $insert_id;
		global $db_connection;
		global $ring_types_ids;
		global $ring_materials_ids;
		$type = $ring_types_ids[$ring['type']];
		$size = $ring['size'];
		$material = $ring_materials_ids[$ring['material']];
		$count = $ring['count'];
		$local_rc = $db_connection->query("INSERT INTO rings_sets(".
			"preorder_id, type, size, material, count) VALUES (".
			"$insert_id, $type, $size, $material, $count)");
		if (!$local_rc) {
			return mysqli_error($db_connection);
		}
		return true;
	});
	if ($rc !== true) {
		echo json_encode(['error' => $rc]);
		$db_connection->rollback();
		exit();
	}

	//--------------------process discounts

	if (count($all_discs)) {
		if (isset($all_discs['mark']) && isset($all_discs['number'])) {
			$mark = $all_discs['mark'];
			$number = ''.$all_discs['number'];
			if (!validate_stud_number($number)) {
				echo json_encode(['warning' => 'Ошибка ввода номера студенческого билета']);
				exit();
			}
			if (($mark > 2) && ($mark <= 5)) {
				$rc = $db_connection->query("INSERT INTO mark_discounts (".
					"preorder_id, mark, stud_number) VALUES (".
					"$insert_id, $mark, $number)");
				if (!$rc) {
					if (mysqli_errno($db_connection) == 1062) { //error duplicate rows
						echo json_encode(['warning' => 'Такой номер студенческого билета уже зарегистрирован']);
						$db_connection->rollback();
						exit();
					}
					echo json_encode(['error' => mysqli_error($db_connection)]);
					exit();
				}
			} else {
				echo json_encode(['warning' => 'Ошибка ввода среднего балла']);
				exit();
			}
		}
	}

	//-------------------process packages

	if (count($all_packs)) {
		for ($i = 0, $sz = count($all_packs); $i < $sz; ++$i) {
			$pack = $all_packs[$i];
			if (!isset($rings_packages[$pack['id']])) {
				echo json_encode(['warning' => 'Ошибка заказа пакета']);
				exit();
			}
			$pack_id = $pack['id'];
			$pack_info = $rings_packages[$pack_id];
			if (!isset($ring_materials_ids[$pack['material']])) {
				echo json_encode(['warning' => 'Ошибка заказа пакета']);
				exit();
			}
			$material = $ring_materials_ids[$pack['material']];
			$rc = $db_connection->query("INSERT INTO rings_packs (".
				"preorder_id, pack_id, material) VALUES (".
				"$insert_id, $pack_id, $material)");
			if (!$rc) {
				echo json_encode(['error' => mysqli_error($db_connection)]);
				exit();
			}
			$pack_insert_id = $db_connection->insert_id;
			$pack_rings = $pack['rings'];
			$szj = count($pack_rings);
			$all_rings_count += $szj;
			if ($all_rings_count > max_rings_count) {
				echo json_encode(['warning' => 'Нельзя выбрать колец более '.max_rings_count]);
				exit();
			}
			for ($j = 0; $j < $szj; ++$j) {
				$next_ring = $pack_rings[$j];
				$type = $next_ring['ring'];
				$size = $next_ring['size'];
				if (!isset($ring_types_ids[$type])) {
					echo json_encode(['warning' => 'Ошибка заказа пакета']);
					exit();
				}
				$type = $ring_types_ids[$type];
				if ($size <= 0) {
					echo json_encode(['warning' => 'Ошибка заказа пакета']);
					exit();
				}
				$rc = $db_connection->query("INSERT INTO rings_pack_items (".
					"rings_pack_id, type, size) VALUES (".
					"$pack_insert_id, $type, $size)");
				if (!$rc) {
					echo json_encode(['warning' => 'Ошибка заказа пакета']);
					exit();
				}
			}
		}
	}


	/*
CREATE TABLE `preorders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creating_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `done` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_idx` (`phone`),
  UNIQUE KEY `email_idx` (`email`),
  KEY `time_idx` (`creating_time`)
)

CREATE TABLE `rings_sets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `preorder_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `size` float NOT NULL,
  `material` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `preorder_idx` (`preorder_id`),
  CONSTRAINT FOREIGN KEY (`preorder_id`) REFERENCES `preorders` (`id`) ON DELETE CASCADE
)

CREATE TABLE mark_discounts (
  id int NOT NULL AUTO_INCREMENT,
  preorder_id int NOT NULL,
  mark float NOT NULL,
  stud_number bigint NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY stud_num_idx (stud_number),
  CONSTRAINT FOREIGN KEY (preorder_id) REFERENCES preorders (id) ON DELETE CASCADE
)

CREATE TABLE rings_packs (
  id int NOT NULL AUTO_INCREMENT,
  preorder_id int NOT NULL,
  pack_id int NOT NULL,
  material int NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FOREIGN KEY (preorder_id) REFERENCES preorders (id) ON DELETE CASCADE
)

CREATE TABLE rings_pack_items (
  id int NOT NULL AUTO_INCREMENT,
  rings_pack_id int NOT NULL,
  type int NOT NULL,
  size float NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FOREIGN KEY (rings_pack_id) REFERENCES rings_packs (id) ON DELETE CASCADE
)
*/
	$subject = 'Новый заказ на cmc-rings.ru';
	$message = '<html>';
	$message .= 	'<head><title>Новый заказ на cmc-rings.ru</title></head>';
	$message .= 	'<body>';
	$message .= 		'<table width="100%" align="center">';
	$message .= 			"<tr><td>Имя: $name; Телефон: $phone; Почта: $email</td></tr>";
	$message .= 			'<tr><td>Детали в меню администратора.</td></tr>';
	$message .= 		'</table>';
	$message .= 	'</body>';
	$message .= '</html>';
	$headers = 'From: CMC-RINGS-ADMIN <admin@cmc-rings.ru>'.PHP_EOL.
		'Reply-To: <admin@cmc-rings.ru>'.PHP_EOL.'X-Mailer: PHP/'.phpversion().'MIME-Version: 1.0'.PHP_EOL.
		'Content-type: text/html; charset=UTF-8'.PHP_EOL;
	if (!mail('admin@cmc-rings.ru', $subject, $message, $headers, '-f admin@cmc-rings.ru')) {
		echo json_encode(['error' => error_get_last()]);
		exit();
	}

	$db_connection->commit();
	$db_connection->close();
	echo json_encode(['response' => 'ok']);
	exit();
?>
