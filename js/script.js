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

ring_names = {1: 'Перстень', 2: 'Кольцо', 3: 'Колечко'};
//materials = ['Серебро', 'Бумага', 'Ничего'];
materials = ['Серебро'];
costs = {
  'Перстень': {
    'Серебро': 3000//,
    // 'Бумага': 1000,
    // 'Ничего': 500
  },
  'Кольцо': {
    'Серебро': 2000//,
    // 'Бумага': 4000,
    // 'Ничего': 3000
  },
  'Колечко': {
    'Серебро': 2500//,
    // 'Бумага': 9000,
    // 'Ничего': 8000
  }
};

rings_sizes = {
  'Перстень': [18, 19.5],
  'Кольцо': [16.5, 18, 19.5],
  'Колечко': [16.5, 18]
};

start_ring_size = 16.5;
max_rings_count = 30;

response_status_error_color = "#BD0002";
response_status_success_color = "#00CC0B";

name_max_len = 150;
phone_max_len = 15;

total_cost_singles = 0;
total_rings_cnt_now = 0;
total_with_disc = false;

rings_timeouts = [null, null, null];
rings_directions = [+1, +1, +1];
rings_images = [[], [], []];
ring_urls = ['/css/ring2/ring2_frame0',
  '/css/ring0/ring0_frame0',
  '/css/ring1/ring1_frame0'];
rings_cycle = 90;
rings_min_photo_id = 0;
rings_max_photo_id = 35;

date_action_header = "Внимание!";
date_action_text = 'До 1 ноября действует скидка 20%';


function get_str_ring_rolle_id(num_id) {
  if (num_id < 10)
    return '00'+num_id.toString()+'.jpg';
  return '0'+num_id.toString()+'.jpg';
}

function get_ring_direction(ring_id) {
  return 1;
}

function is_time_to_finish_roll(current_number, ring_id) {
  if ((current_number == rings_min_photo_id) && (rings_directions[ring_id] < 0)) {
    return true;
  }
  return false;
}

function move_on_progress_preload_bar(ring_id, next_frame) {
  degrees = 10 * (next_frame + 1);
  bar = $($(".ring-img-small")[ring_id]).prev(); 
  if (degrees > 180) {
    degrees -= 90;
    bar.css({'background-image': 'linear-gradient('+degrees.toString()+'deg, transparent 50%, #17a9ce 50%),'+
      'linear-gradient(90deg, #1795B6 50%, transparent 50%)'});
  } else {
    degrees += 90;
    bar.css({'background-image': 'linear-gradient('+degrees.toString()+'deg, transparent 50%, #1795B6 50%),'+
      'linear-gradient(90deg, #1795B6 50%, transparent 50%)'});
  }
}

function preload_next_ring_frame(ring_id, next_frame, callback) {
  if (next_frame > rings_max_photo_id) {
    console.log('preloaded '+ring_id.toString());
    if (callback != null) callback();
    return;
  }
  next = new Image();
  next.src = ring_urls[ring_id]+get_str_ring_rolle_id(next_frame);
  next.onload = function() {
    rings_images[ring_id].push(next);
    move_on_progress_preload_bar(ring_id, next_frame);
    preload_next_ring_frame(ring_id, next_frame+1, callback);
  };
}

function preload_rings_rollings_for_one(ring_id, callback) {
  preload_next_ring_frame(ring_id, 0, callback);
}

function preload_rings_rollings() {
  console.log('start preloading 0');
  preload_rings_rollings_for_one(0, function() {
    console.log('start preloading 1');
    preload_rings_rollings_for_one(1, function() {
      console.log('start preloading 2');
      preload_rings_rollings_for_one(2, null);
    });
  });
}

function rings_rolling_is_preloaded(ring_id) {
  if (rings_images[ring_id].length == (rings_max_photo_id - rings_min_photo_id + 1)) {
    return true;
  }
  return false;
}

function rolle_ring(ring_id) {
  target = $($(".ring-img-small")[ring_id]);
  current_number = parseInt(target.attr("data-imgid"));
  direction = get_ring_direction(ring_id);
  current_number += direction;
  if (current_number > rings_max_photo_id) {
    current_number = rings_min_photo_id;
  }
  if (is_time_to_finish_roll(current_number, ring_id)) {
    clearInterval(rings_timeouts[ring_id]);
    rings_timeouts[ring_id] = null;
    target.attr("data-imgid", rings_min_photo_id.toString());
    target[0].src = rings_images[ring_id][current_number].src;
    return;
  }
  target.attr("src", ring_urls[ring_id]+get_str_ring_rolle_id(current_number));
  target.attr("data-imgid", current_number.toString());
}

function mouse_on_ring(ring_id) {
  ring_id -= 1;
  if (!rings_rolling_is_preloaded(ring_id)) {
    console.log('rings is not preloaded');
    return;
  }
  rings_directions[ring_id] = +1;
  if (rings_timeouts[ring_id] == null) {
    rings_timeouts[ring_id] = setInterval(function() {rolle_ring(ring_id);}, rings_cycle);
  }
}

function mouse_out_ring(ring_id) {
  rings_directions[ring_id - 1] = -1;
}

order_area_expanded = false;
function show_order_area() {
  if (!order_area_expanded) {
    $(".order-making-area").hide();
    $(".order-making-area").slideDown(1000);
    order_area_expanded = true;
  }
}

function activate_overlay() {
  $("#overlay").fadeIn(500);
}

function deactivate_overlay() {
  $("#overlay").fadeOut(500);
}

function show_popup_window(elem_id) {
  activate_overlay();
  var all_height = window.innerHeight;
  var all_width = window.innerWidth;
  var element = $(elem_id);
  var elem_height = element.height();
  var elem_width = element.width();
  var top_offset = parseInt((all_height - elem_height)/2);
  var left_offset = parseInt((all_width - elem_width)/2);
  element.css({"top": top_offset, "left": left_offset});
  element.fadeIn(500);
  $('body').css({'overflow': 'hidden'});
}

function hide_popup_window(elem_id) {
  deactivate_overlay();
  $(elem_id).fadeOut(500);
  $('body').css({'overflow': 'auto'});
}

function show_how_to_size_ring() {
  show_popup_window(".sizes-instruct-table");
}

function hide_how_to_size_ring() {
  hide_popup_window(".sizes-instruct-table");
}

function is_number(val) {
  return val % 1 === 0;
}

function aggregate_one_rings_set(set) {
  type = set.children[1].innerHTML;
  size = parseFloat(set.children[2].children[1].children[0].value);
    select = set.children[3].children[1].children[0];
  material = select.options[select.selectedIndex].text;
  count = parseInt(set.children[4].children[1].children[0].value);
  return {'type': type, 'size': size, 'count': count, 'material': material};
}

function show_discount() {
  $(".rings-basket-calc-disc").show();
}

function hide_discount() {
  $(".rings-basket-calc-disc").hide();
}

function get_count_and_cost_simple_basket()
{
  basket = $(".rings-basket-simple");
  rings_cnt = 0;
  cost = 0;
  target = $(".rings-basket-result");
  for (i = 0; i < basket.children().length; ++i) {
    rings_set = basket.children()[i];
    values = aggregate_one_rings_set(rings_set);
    count = values['count'];
    type = values['type'];
    material = values['material'];
    if (count < 0) {
      hide_discount();
      target.html("<div>Ошибка ввода</div>");
      return {};
    }
    size = parseFloat(values['size']);
    if (isNaN(size) || (size <= 0)) {
        hide_discount();
        target.html("<div>Ошибка ввода</div>");
        return {};  
    }
    rings_cnt += count;
    cost += costs[type][material] * count;
  }
  if (!is_number(rings_cnt) || !is_number(cost) || (rings_cnt < 0) || (cost < 0)) {
    hide_discount();
    target.html("<div>Ошибка ввода</div>")
    return {};
  }
  return {'count': rings_cnt, 'cost': cost};
}

function is_discount() {
  var cur_date = new Date();
  var end_date = new Date(2016, 10, 31);
  if (cur_date < end_date) return true;
  else return false;
}

function get_discount() {
  if (is_discount()) return 20;
  else return 0;
}

function show_total_check() {
  var target = $(".rings-basket-result");
  total_cost_now = total_cost_singles;
  total_cost_now = parseInt(total_cost_now);
  var new_cost = (1 - get_discount()/100.0)*total_cost_now;

  target.html('<div>Всего выбрано колец: <span id="rings-count-id">' + total_rings_cnt_now + '</span> на сумму'+ 
          '<span class="rings-basket-result-price">'+
            new_cost + '<img src="/css/ruble.svg">'+
          '</span>'+
        '</div>'+
        '<div class="rings-basket-result-ps">'+
          'Оплату необходимо произвести при получении'+
        '</div>'
  );
}

function update_summary() {
  total_cost_singles = 0;
  total_rings_cnt_now = 0;
  total_with_disc = false;
  var target = $(".rings-basket-result");
  var simple_rings = get_count_and_cost_simple_basket();
  var rings_cnt = simple_rings['count'];
  if (isNaN(rings_cnt)) {
    hide_discount();
    target.html("<div>Ошибка ввода данных</div>");
    return;
  }
  if (rings_cnt == 0) {
    hide_discount();
    target.html("<div>Не выбрано ни одного кольца</div>");
    return;
  }
  if (rings_cnt > max_rings_count) {
    hide_discount();
    target.html("<div>Нельзя выбрать более "+max_rings_count.toString()+" колец</div>");
    return;
  }
  show_discount();
  total_cost_singles = simple_rings['cost'];
  total_rings_cnt_now = rings_cnt;
  show_total_check();
}

function aggregate_rings_for_sending() {
  basket = $(".rings-basket-simple");
  result = [];
  for (i = 0; i < basket.children().length; ++i) {
    rings_set = basket.children()[i];
    values = aggregate_one_rings_set(rings_set);
    if (values['count'] < 0) {
      return false;
    }
    if (values['size'] <= 0) {
      return false;
    }
    if (values['count'] > 0) {
      result.push(values);
    }
  }
  return result;
}

function show_or_hide_basket() {
  simple_rings = $(".rings-basket-simple");
  childs = simple_rings[0].childElementCount;
  if (childs == 0) {
    $(".rings-all-basket").css({'visibility': 'hidden'});
  } else {
    $(".rings-all-basket").css({'visibility': 'visible'});
  }
}

function remove_ring(event) {
  target = event.target;
  result = target.parentElement;
  parent = result.parentElement;
  parent.remove(result);
  show_or_hide_basket();
  update_summary();
}

function update_selecter(target, sign) {
  if (target.hasClass("int-selecter")) {
      val = parseInt(target.val()) + 1*sign;
      if ((isNaN(val)) || (val <= 0)) {
          return;
      }
      target.val(val);
  } else {
      val = parseFloat(target.val()) + 0.5*sign;
      if ((isNaN(val)) || (val <= 0)) {
        return;
      }
      target.val(val);
  }
  update_summary();
}

function increment_selecter(event) {
  target = $(event.target.parentElement.children[0]);
  update_selecter(target, +1);
}

function decrement_selecter(event) {
  target = $(event.target.parentElement.children[0]);
  update_selecter(target, -1);
}

function create_number_selecter(label, start, type) {
  result = document.createElement('span');
    span_label = document.createElement('span');
    span_label.className = "selecter-label";
    span_label.innerHTML = label;
    result.appendChild(span_label);

    span_selecter = document.createElement('span');
      input = document.createElement('input');
      input.className = "number-selecter";
      if (type == 'int') {
          input.className += " int-selecter";
      } else {
          input.className += " float-selecter";
      }
      input.value = start;
      input.addEventListener('input', update_summary);
      span_selecter.appendChild(input);

      up = document.createElement('div');
      up.className = "ring-select-arrow-up";
      up.addEventListener('click', increment_selecter);
      down = document.createElement('div');
      down.className = "ring-select-arrow-down";
      down.addEventListener('click', decrement_selecter);
      span_selecter.appendChild(up);
      span_selecter.appendChild(down);
    result.appendChild(span_selecter);
  return result;
}

function create_strings_selecter(label, variants, label_class, arrow_class) {
  result = document.createElement('span');
    span_label = document.createElement('span');
    if (!label_class) label_class = "selecter-label";
    if (!arrow_class) arrow_class = "ring-select-arrow-down-middle";
    span_label.className = label_class;
    span_label.innerHTML = label;
    result.appendChild(span_label);

    span_selecter = document.createElement('span');
      select = document.createElement('select');
      select.addEventListener('input', update_summary);
      for (i = 0; i < variants.length; ++i) {
        option = document.createElement('option');
        option.innerHTML = variants[i];
        select.appendChild(option);
      }
      span_selecter.appendChild(select);

      arrow = document.createElement('div');
      arrow.className = arrow_class;
      span_selecter.appendChild(arrow);
    result.appendChild(span_selecter);
  return result;
}

function create_ring_busket_item(id) {
  name = ring_names[id];
  item = document.createElement('div');
  item.className = "rings-basket-item";
    close_btn = document.createElement('span');
      img = document.createElement('img');
      img.className = "remove-btn";
      img.src = "/css/small-close.svg";
      img.addEventListener('click', remove_ring);
      close_btn.appendChild(img);

    ring_name = document.createElement('span');
    ring_name.className = "rings-basket-item-name";
    ring_name.innerHTML = name;

    size = create_strings_selecter('Размер', rings_sizes[name]);
    material = create_strings_selecter('Материал', materials);
    count = create_number_selecter('Количество', 1, 'int');
  item.appendChild(close_btn);
  item.appendChild(ring_name);
  item.appendChild(size);
  item.appendChild(material);
  item.appendChild(count);
  return item;
}

function add_ring(id) {
  item = create_ring_busket_item(id);
  basket = $(".rings-basket-simple");
  basket.append(item);
  $(".rings-all-basket").css({'visibility': 'visible'});
  update_summary();
}

function getXmlHttp(){
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}

function validate_form() {
  name = $("#customer-name").val();
  phone = $("#customer-phone").val();
  if (name.length == 0) {
    show_response_status(response_status_error_color, "Имя не может "+
      "быть пустым");
    return false;
  }
  if (phone.length == 0) {
    show_response_status(response_status_error_color, "Телефон не может "+
      "быть пустым");
    return false;
  }
  if (name.length > name_max_len) {
    show_response_status(response_status_error_color, "Имя не может быть "+
      "длиннее " + name_max_len + " символов");
    return false;
  }
  if (phone.length > phone_max_len) {
    show_response_status(response_status_error_color, "Телефон не может быть "+
      "длиннее " + phone_max_len + " символов");
    return false;
  }
  return true;
}

function show_response_status(color, msg) {
  container = $(".message-bubble-container");
  container.hide('slide', {'direction': 'down'}, 300, function() {
    container.css({'color': color});
    container.children('.message-bubble').html(msg);
    container.show('slide', {'direction': 'down'}, 300);
  });
}

function send_info() {
  if (!validate_form()) {
    return;
  }
  var button = $("#make-order-btn-id");
  var local_server = getXmlHttp();
  var fd = new FormData();
  var name = $("#customer-name").val();
  var phone = $("#customer-phone").val();
  var email = $("#customer-email").val();
    fd.append("name", name);
    fd.append("phone", phone);
    fd.append("email", email);
    var rings = aggregate_rings_for_sending();
    if (rings === false) {
      show_response_status(response_status_error_color, 'Ошибка ввода данных');
      return;
    }
    if (rings.length == 0) {
      show_response_status(response_status_error_color, 'Вы не выбрали кольцо');
      return;
    }
    fd.append("content", JSON.stringify(rings));
    local_server.onreadystatechange = function() {
      if (local_server.readyState == 4) {
        button.html("ЗАКАЗАТЬ");
        console.log(local_server.responseText);
        try {
          answer = JSON.parse(local_server.responseText);
        } catch(error) {
          console.log('error during parsing: ', error,
                      local_server.responseText);
          show_response_status(response_status_error_color,'На сервере '+
                               'произошла ошибка. Пожалуйста, повторите позже.')
          return;
        }
        if ('error' in answer) {
          console.log('error: ', answer['error']);
          show_response_status(response_status_error_color,'На сервере произошла ошибка. '+
            'Пожалуйста, повторите позже.')
          return;
        }
        if (('response' in answer) && (answer['response'] == 'ok')) {
          show_response_status(response_status_success_color, 'ПРЕДЗАКАЗ СОВЕРШЕН')
          return;
        }
        if ('warning' in answer) {
          show_response_status(response_status_error_color, answer['warning']);
          return;
        }
      }
    };
  local_server.open("POST", "make_order.php");
  button.html("ПОДОЖДИТЕ...");
  local_server.send(fd);
}

$(document).ready(function() {
  preload_rings_rollings();
});