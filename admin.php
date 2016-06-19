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
	if (isset($_GET['done'])) {
		$done = $_GET['done'];
		$rc = $db_connection->query("UPDATE preorders SET done = 1 WHERE id = $done");
		if (!$rc) {
			echo 'Error: '.mysqli_error($db_connection);
			exit();
		}
	}
	$offset = ($page - 1) * preorders_per_page;
	$rc = $db_connection->query("SELECT * FROM preorders WHERE done = 0 LIMIT $limit".
		" OFFSET $offset");
	if (!$rc) {
		echo 'Error: '.mysqli_error($db_connection);
		exit();
	}
	$preorders = [];
	while($row = $rc->fetch_assoc()) {
		$row['order'] = [];
		$preorder_id = $row['id'];
		$order_rc = $db_connection->query("SELECT type, size, material, count ".
			"FROM rings_sets WHERE preorder_id=$preorder_id");
		if (!$order_rc) {
			echo 'Error: '.mysqli_error($db_connection);
			exit();
		}
		while($ring_set = $order_rc->fetch_assoc()) {
			array_push($row['order'], $ring_set);
		}
		array_push($preorders, $row);
	}
	$prev_page = 1;
	if ($page > 1) $prev_page = $page - 1;
	$next_page = $page + 1;
	include_once('admin_template.php');
?>