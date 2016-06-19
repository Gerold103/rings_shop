<?php
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
	if ($all_rings == NULL) {
		echo json_encode(['warning' => 'Ошибка ввода данных']);
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
	//$rc = $db_connection->begin_transaction();
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
	/*
CREATE TABLE `preorders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creating_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_idx` (`phone`),
  UNIQUE KEY `email_idx` (`email`),
  KEY `time_idx` (`creating_time`)
)

CREATE TABLE `rings_sets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `preorder_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `size` int(11) NOT NULL,
  `material` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `preorder_idx` (`preorder_id`),
  CONSTRAINT `rings_sets_ibfk_1` FOREIGN KEY (`preorder_id`) REFERENCES `preorders` (`id`) ON DELETE CASCADE
)*/
	$db_connection->commit();
	$db_connection->close();
	echo json_encode(['response' => 'ok']);
	exit();
?>
