<!--
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
-->
<html>
  <head>
    <meta charset="utf-8">
    <title>Админка</title>
  </head>

  <body>
    <table align="center" border="2" cellpadding="3">
      <tr>
        <td>Номер предзаказа</td>
        <td>Имя</td>
        <td>Телефон</td>
        <td>Почта</td>
        <td>Дата заказа
          <a href="?page=1&date_order=desc"><button>По уб.</button></a>
          <a href="?page=1&date_order=asc"><button>По возр.</button></a>
        </td>
        <td>Заказ</td>
        <td>Скидки</td>
        <td>Пакеты</td>
        <td>Отметить как выполненный</td>
      </tr>
      <?php
        for ($i = 0, $sz = count($preorders); $i < $sz; ++$i) {
      ?>
        <tr>
          <td><?php echo $preorders[$i]['id']; ?></td>
          <td><?php echo $preorders[$i]['name']; ?></td>
          <td><?php echo $preorders[$i]['phone']; ?></td>
          <td><?php echo $preorders[$i]['email']; ?></td>
          <td><?php echo $preorders[$i]['creating_time']; ?></td>
          <td><?php
            $preorder = $preorders[$i]['order'];
            for ($j = 0, $szj = count($preorder); $j < $szj; ++$j) {
          ?>
            <b>Тип:</b> <?php echo $preorder[$j]['type']; ?>;
            <b>Размер:</b> <?php echo $preorder[$j]['size']; ?><br>
            <b>Материал:</b> <?php echo $preorder[$j]['material']; ?>;
            <b>Количество:</b> <?php echo $preorder[$j]['count']; ?>
            <?php if ($j + 1 < $szj) { ?>
              <br><br>
            <?php } ?>
          <?php
            }
          ?></td>
          <td><?php
            $discs = $preorders[$i]['discs'];
            for ($j = 0, $szj = count($discs); $j < $szj; ++$j) {
              echo $discs[$j];
              if ($j + 1 < $szj) echo '<br>';
            }
          ?></td>
          <td><?php
            $packs = $preorders[$i]['packs'];
            for ($j = 0, $szj = count($packs); $j < $szj; ++$j) {
          ?>
            <b>Тип:</b> <?php echo $packs[$j]['type']; ?>;<br>
            <b>Материал:</b> <?php echo $packs[$j]['material']; ?>;<br>
            <b>Кольца:</b><br> <?php
              $rings = $packs[$j]['rings'];
              for ($k = 0, $szk = count($rings); $k < $szk; ++$k) {
                echo $rings[$k]['ring'].': '.$rings[$k]['size'];
                if ($k + 1 < $szk) echo '<br>';
              }
              if ($j + 1 < $szj) echo '<br><br>';
            ?>
          <?php
            }
          ?></td>
          <td>
            <a href="?page=<?php echo $page; ?>&done=<?php echo $preorders[$i]['id']; ?>">
              <button>Выполнен</button>
            </a>
          </td>
        </tr>
      <?php
        }
      ?>
    </table>
    <div align="center">
      <a href="?page=<?php echo $prev_page; ?>">Предыдущая страница</a>
      <a href="?page=<?php echo $next_page; ?>">Следующая страница</a>
    </div>
  </body>
</html>