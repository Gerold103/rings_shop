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
  include_once("credentials.php");
  $db_connection = mysqli_connect(db_host, db_user_name, db_password);
  if (!$db_connection->ping()) {
    echo json_encode(['error' => 'Database connection error']);
    exit();
  }
  if (!$db_connection->select_db(db_name)) {
    echo json_encode(['error' => 'Database connection error']);
    exit();
  }
  if (!$db_connection->query("SET CHARACTER SET 'utf8'")) {
    echo json_encode(['error' => 'Database encoding error']);
    exit();
  }

  const min_ring_size = 1;
  const max_ring_size = 60;

  const max_rings_count = 30;

  const preorders_per_page = 3;

  $ring_materials = ['Серебро', 'Бумага', 'Ничего'];
  $ring_types = ['Перстень', 'Кольцо', 'Колечко'];

  $ring_types_ids = ['Перстень' => 1, 'Кольцо' => 2, 'Колечко' => 3];
  $ring_types_ids_reversed = [1 => 'Перстень', 2 => 'Кольцо', 3 => 'Колечко'];
  $ring_materials_ids = ['Серебро' => 1, 'Бумага' => 2, 'Ничего' => 3];
  $ring_materials_ids_reversed = [1 => 'Серебро', 2 => 'Бумага', 3 => 'Ничего'];
?>
