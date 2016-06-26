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

  const preorders_per_page = 10;

  //$ring_materials = ['Серебро', 'Бумага', 'Ничего'];
  $ring_materials = ['Серебро'];
  $ring_types = ['Перстень', 'Кольцо', 'Колечко'];

  $ring_types_ids = ['Перстень' => 1, 'Кольцо' => 2, 'Колечко' => 3];
  $ring_types_ids_reversed = [1 => 'Перстень', 2 => 'Кольцо', 3 => 'Колечко'];
  //$ring_materials_ids = ['Серебро' => 1, 'Бумага' => 2, 'Ничего' => 3];
  $ring_materials_ids = ['Серебро' => 1];
  //$ring_materials_ids_reversed = [1 => 'Серебро', 2 => 'Бумага', 3 => 'Ничего'];
  $ring_materials_ids_reversed = [1 => 'Серебро'];

  $rings_packages = [
    1 => [
      'name' => 'Дуэт',
      'set' => [['ring' => 'Перстень', 'count' => 1], ['ring' => 'Колечко', 'count' => 1]],
      'cost' => 4500,
      'info' => '1 Перстень + 1 Колечко',
      'img_src' => 'css/rings_packs/pack1_round.svg',
      'img_src_pressed' => 'css/rings_packs/pack1_round_pressed.svg'
    ],
    2 => [
      'name' => 'Триумвират',
      'set' => [['ring' => 'Перстень', 'count' => 1], ['ring' => 'Колечко', 'count' => 1], ['ring' => 'Кольцо', 'count' => 1]],
      'cost' => 6000,
      'info' => '1 Перстень + 1 Колечко + 1 Кольцо',
      'img_src' => 'css/rings_packs/pack2_round.svg',
      'img_src_pressed' => 'css/rings_packs/pack2_round_pressed.svg'
    ],
    3 => [
      'name' => 'Квинтет',
      'set' => [['ring' => 'Перстень', 'count' => 2], ['ring' => 'Колечко', 'count' => 2], ['ring' => 'Кольцо', 'count' => 1]],
      'cost' => 9000,
      'info' => '2 Перстня + 2 Колечка + 1 Кольцо',
      'img_src' => 'css/rings_packs/pack3_round.svg',
      'img_src_pressed' => 'css/rings_packs/pack3_round_pressed.svg'
    ],
    4 => [
      'name' => 'Великолепная пятерка',
      'set' => [['ring' => 'Перстень', 'count' => 1], ['ring' => 'Колечко', 'count' => 1], ['ring' => 'Кольцо', 'count' => 3]],
      'cost' => 10000,
      'info' => '1 Перстень + 1 Колечко + 3 Кольца',
      'img_src' => 'css/rings_packs/pack4_round.svg',
      'img_src_pressed' => 'css/rings_packs/pack4_round_pressed.svg'
    ],
    5 => [
      'name' => 'Октет',
      'set' => [['ring' => 'Перстень', 'count' => 3], ['ring' => 'Колечко', 'count' => 3], ['ring' => 'Кольцо', 'count' => 2]],
      'cost' => 15000,
      'info' => '3 Перстня + 3 Колечка + 2 Кольца',
      'img_src' => 'css/rings_packs/pack5_round.svg',
      'img_src_pressed' => 'css/rings_packs/pack5_round_pressed.svg'
    ]
  ];
  $rings_packages_reversed = ['Дуэт' => 1, 'Триумвират' => 2, 'Квинтет' => 3, 'Великолепная пятерка' => 4, 'Октет' => 5];
?>
