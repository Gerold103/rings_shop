<?php
  date_default_timezone_set('Europe/Moscow');
  $need_discount = false;
  $discount_text = '';
  $discount_end_time = strtotime('2016-11-01 00:00');
  $current_time = time();
  if ($current_time < $discount_end_time) {
    $need_discount = true;
    $discount_text = 'До 1 ноября на все виды колец действует скидка 20%!';
  }
?>

<html>
  <head>
    <meta charset="utf-8">
    <meta name="description" content="Заказать кольца ВМК МГУ">
    <meta name="keywords" content="Кольцо, серебро, ВМК, МГУ, купить кольцо, заказать кольцо">
    <title>Купить кольца ВМК МГУ</title>
    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/script.js"></script>
    <link rel="icon" type="image/png" href="css/favicons/favicon-16x16.png" sizes="16x16">
    <link rel="icon" type="image/png" href="css/favicons/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="css/favicons/favicon-96x96.png" sizes="96x96">
    <link rel="apple-touch-icon" sizes="57x57" href="css/favicons/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="css/favicons/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="css/favicons/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="css/favicons/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="css/favicons/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="css/favicons/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="css/favicons/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="css/favicons/apple-touch-icon-152x152.png">
    <!-- Yandex.Metrika counter --> <script type="text/javascript"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter38106545 = new Ya.Metrika({ id:38106545, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks"); </script> <noscript><div><img src="https://mc.yandex.ru/watch/38106545" style="position:absolute; left:-9999px;" alt="" /></div></noscript> <!-- /Yandex.Metrika counter -->
  </head>

  <body>
    <div align="center" class="footer-wrapper">
      <div class="not-footer" align="center">
        <div class="container-of-all">
          <div role="Header" class="main-header-place" align="center">
            <img src="css/main_rings.png">
            <h1 align="center">Кольца<br><span><font color="#75acff">ВМК</font>МГУ</span></h1>
          </div>
        </div>
        
        <div class="ring-variants" align="center">
          <img src="css/shadow.png" class="shadow-rounded">
          <div class="ring-item">
            <div class="ring-small-container">
              <div class="ring-small-progress-bar"></div>
              <img class="ring-img-small" src="css/ring2/ring2_frame0000.jpg" data-imgid="1" onmouseover="mouse_on_ring(1);" onmouseout="mouse_out_ring(1);">
            </div>
            <span>КОЛЬЦО</span><span class="price">2000руб.</span>
          </div>
          <div class="ring-item">
            <div class="ring-small-container">
              <div class="ring-small-progress-bar"></div>
              <img class="ring-img-small" src="css/ring0/ring0_frame0000.jpg" data-imgid="1" onmouseover="mouse_on_ring(2);" onmouseout="mouse_out_ring(2);">
            </div>
            <span>ПЕРСТЕНЬ</span><span class="price">3000руб.</span>
          </div>
          <div class="ring-item">
            <div class="ring-small-container">
              <div class="ring-small-progress-bar"></div>
              <img class="ring-img-small" src="css/ring1/ring1_frame0000.jpg" data-imgid="1" onmouseover="mouse_on_ring(3);" onmouseout="mouse_out_ring(3);">
            </div>
            <span>КОЛЕЧКО</span><span class="price">2500руб.</span>
          </div>

          <?php if (isset($need_discount) && $need_discount) { ?>
          <div>
            <div class="discount-info">
              <div class="discount-title">
                <?php echo($discount_text); ?>
              </div>
              <div class="discount-ref">
                * цена указана без скидки
              </div>
            </div>
          </div>
          <?php } ?>

        </div>
        <img src="css/shadow.png" class="shadow-rounded">
        <div class="container-of-all">
          <div class="make-order-button" align="center">
            <div id="make-order-button-id" onclick="show_order_area();">
              СДЕЛАТЬ БЕСПЛАТНЫЙ ПРЕДЗАКАЗ
            </div>
          </div>
        </div>
        <div class="order-making-area" id="order-making-area-id">
          <div class="order-panel" align="center">
            <div class="container-of-all">
              <div class="add-ring">
                <img src="css/ring0.svg" onclick="add_ring(1);">
              </div>
              <div class="add-ring">
                <img src="css/ring1.svg" onclick="add_ring(2);">
              </div>
              <div class="add-ring">
                <img src="css/ring2.svg" onclick="add_ring(3);">
              </div>
            </div>
            <div class="container-of-all">
              <div class="rings-all-basket">
                <div class="rings-basket-simple">
                </div>
              </div>
              <div align="center">
                <div class="how-to-know-size-btn" onclick="show_how_to_size_ring();">
                  Как определить размер кольца?
                </div>
                <div class="sizes-instruct-table" align="left">
                  <img src="css/huge_close_gray.svg" onclick="hide_how_to_size_ring();">
                  Размер кольца - это диаметр пальца. Чтобы его определить, измеряем сначала обхват пальца с помощью веревки/нитки или полоски бумаги (она особенно удобна для широких колец). Для этого берем веревку, обматывает нужный палец один раз и отрезаем лишние концы, либо намечаем маркером. Затем измеряем длину полученной веревочки в миллиметрах и смотрим соответствующий размер по таблице, приведенной ниже.
                  <div class="sizes-instruct-table-container" align="center">
                    <table cellspacing="0">
                      <tr>
                        <th>длина нитки</th>
                        <th>размер кольца</th>
                      </tr>
                      <tr>
                        <td>52 мм</td>
                        <td>16.5</td>
                      </tr>
                      <tr>
                        <td>56.6 мм</td>
                        <td>18</td>
                      </tr>
                      <tr>
                        <td>61.2 мм</td>
                        <td>19.5</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div align="left" class="rings-basket-result">
                <div>Не выбрано ни одного кольца</div>
              </div>
            </div>
          </div>
          <div class="container-of-all">
            <div class="contacts-panel" align="center">
              <div>
                <div class="contact-field" align="left">
                  <span>ИМЯ*</span><input id="customer-name"/>
                </div>
                <div class="contact-field" align="left">
                  <span>ТЕЛЕФОН*</span><input id="customer-phone"/>
                </div>
                <div class="contact-field" align="left">
                  <span>EMAIL</span><input id="customer-email"/>
                </div>
                <div class="finish-contact-field" align="right">
                  * Обязательные поля
                </div>
              </div>
            </div>
            <div class="make-order" align="center">
              <div align="center" class="message-bubble-container">
                <div class="message-bubble">Сообщение</div>
              </div>
              <div onclick="send_info();" id="make-order-btn-id">ЗАКАЗАТЬ</div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer" align="center">
        <div class="container-of-all" align="left">
          <div>ДИЗАЙН КОЛЕЦ И САЙТА: <u><a href="mailto:me@ag-one.ru">АБДУЛЛА ГАЙБУЛЛАЕВ</a></u></div>
          <div>РАЗРАБОТКА САЙТА: <u><a href="http://lgmis.cs.msu.ru/user/25">ВЛАДИСЛАВ ШПИЛЕВОЙ</a></u></div>
          <span class="footer-tel">ТЕЛЕФОН ДЛЯ СПРАВОК: <u><a href="tel:+79265405274">+79265405274</a>&nbsp;&nbsp;&nbsp; АЛЕКСЕЙ</u></span>
          <span class="footer-legal"><u><a href="legal.html">Юридическая информация</a></u></span>
        </div>
      </div>
    </div>
    <div id="overlay" onclick="hide_how_to_size_ring();"></div>
  </body>
</html>