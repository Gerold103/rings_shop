<?php
  include_once("credentials.php");
  $db_connection = mysqli_connect(db_host, db_name, db_password);
  if (!$db_connection->ping()) {
    echo json_encode(['error' => 'Database connection error']);
    exit();
  }
  if (!$db_connection->select_db('gb_x_cmc_r2fe')) {
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

  $ring_materials = ['Серебро', 'Бумага', 'Ничего'];
  $ring_types = ['Перстень', 'Кольцо', 'Колечко'];

  $ring_types_ids = ['Перстень' => 1, 'Кольцо' => 2, 'Колечко' => 3];
  $ring_materials_ids = ['Серебро' => 1, 'Бумага' => 2, 'Ничего' => 3];
?>
