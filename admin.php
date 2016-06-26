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
	session_start();
	if (!isset($_SESSION['admin'])) {
		if (!isset($_GET['password'])) {
			echo 'Access denied';
			exit();
		}
		if ($_GET['password'] != admin_password) {
			echo 'Access denied';
			exit();
		}
		$_SESSION['admin'] = true;
	}
	$page = 1;
	if (isset($_GET['page'])) $page = $_GET['page'];
	$limit = preorders_per_page;
	$date_order = 'ASC';
	if (isset($_SESSION['date_order'])) $date_order = $_SESSION['date_order'];
	if (isset($_GET['date_order'])) {
		$date_order = strtoupper($_GET['date_order']);
		$_SESSION['date_order'] = $date_order;
	}
	if (isset($_GET['done'])) {
		$done = $_GET['done'];
		$rc = $db_connection->query("UPDATE preorders SET done = 1 WHERE id = $done");
		if (!$rc) {
			echo 'Error: '.mysqli_error($db_connection);
			exit();
		}
	}
	$offset = ($page - 1) * preorders_per_page;
	$rc = $db_connection->query("SELECT * FROM preorders WHERE done = 0 ORDER BY ".
		"creating_time $date_order LIMIT $limit OFFSET $offset");
	if (!$rc) {
		echo 'Error: '.mysqli_error($db_connection);
		exit();
	}
	$preorders = [];
	while($row = $rc->fetch_assoc()) {
		$row['order'] = [];
		$preorder_id = $row['id'];
		$local_rc = $db_connection->query("SELECT type, size, material, count ".
			"FROM rings_sets WHERE preorder_id=$preorder_id");
		if (!$local_rc) {
			echo 'Error: '.mysqli_error($db_connection);
			exit();
		}
		while($ring_set = $local_rc->fetch_assoc()) {
			$ring_set['type'] = $ring_types_ids_reversed[$ring_set['type']];
			$ring_set['material'] = $ring_materials_ids_reversed[$ring_set['material']];
			array_push($row['order'], $ring_set);
		}

		$local_rc = $db_connection->query("SELECT mark, stud_number FROM mark_discounts".
			" WHERE preorder_id=$preorder_id");
		if (!$local_rc) {
			echo 'Error: '.mysqli_error($db_connection);
			exit();
		}
		$discs = [];
		while($disc = $local_rc->fetch_assoc()) {
			$next = '<b>Балл:</b> '.$disc['mark'].'; <b>Номер:</b> '.$disc['stud_number'];
			array_push($discs, $next);
		}
		$row['discs'] = $discs;

		$row['packs'] = [];
		$local_rc = $db_connection->query("SELECT id, pack_id, material FROM rings_packs".
			" WHERE preorder_id=$preorder_id");
		if (!$local_rc) {
			echo 'Error: '.mysqli_error($db_connection);
			exit();
		}
		while($next_pack_row = $local_rc->fetch_assoc()) {
			$type = $rings_packages[$next_pack_row['pack_id']]['name'];
			$material = $ring_materials_ids_reversed[$next_pack_row['material']];
			$pack_id = $next_pack_row['id'];
			$rings = [];
			$rings_rc = $db_connection->query("SELECT type, size FROM rings_pack_items".
				" WHERE rings_pack_id=$pack_id");
			if (!$rings_rc) {
				echo 'Error: '.mysqli_error($db_connection);
				exit();
			}
			while($next_ring_row = $rings_rc->fetch_assoc()) {
				$ring_type = $ring_types_ids_reversed[$next_ring_row['type']];
				$ring_size = $next_ring_row['size'];
				array_push($rings, ['ring' => $ring_type, 'size' => $ring_size]);
			}
			array_push($row['packs'], ['type' => $type, 'material' => $material, 'rings' => $rings]);
		}
		array_push($preorders, $row);
	}
	$prev_page = 1;
	if ($page > 1) $prev_page = $page - 1;
	$next_page = $page + 1;
	include_once('admin_template.php');
?>