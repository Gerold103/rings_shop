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

response_status_error_color = "#BD0002";
response_status_success_color = "#00CC0B";

name_max_len = 150;
phone_max_len = 15;

total_cost_singles = 0;
total_cost_packs = 0
total_rings_cnt_now = 0;
total_with_disc = false;

rings_timeouts = [null, null, null];
rings_directions = [+1, +1, +1];
rings_images = [[], [], []];
ring_urls = ['css/ring2/ring2_frame0',
  'css/ring0/ring0_frame0',
  'css/ring1/ring1_frame0'];
rings_cycle = 90;
rings_min_photo_id = 0;
rings_max_photo_id = 35;

date_action_header = "Внимание!";
date_action_text = 'До 1 июля действует "студенческая скидка"! Посчитать скидку можно в панели предзаказа';

slideshow_photos = [
  [
    {photo: 'css/rings_show/ring2_0.png'},
    {photo: 'css/rings_show/ring2_1.png'},
    {photo: 'css/rings_show/ring2_2.png'},
    {photo: 'css/rings_show/ring2_3.png'}
  ],
  [
    {photo: 'css/rings_show/ring0_0.png'},
    {photo: 'css/rings_show/ring0_1.png'},
    {photo: 'css/rings_show/ring0_2.png'},
    {photo: 'css/rings_show/ring0_3.png'},
  ],
  [
    {photo: 'css/rings_show/ring1_0.png'},
    {photo: 'css/rings_show/ring1_1.png'},
    {photo: 'css/rings_show/ring1_2.png'},
    {photo: 'css/rings_show/ring1_3.png'},
    {photo: 'css/rings_show/ring1_4.png'}
  ]
];

slideshow_rings_info = [
  {id: 2, description: 'Вариант для всех и каждого, кто знает цену успеха и умеет выглядеть солидно'},
  {id: 1, description: 'Вариант для того, кто ценит дух свободы и бунтарства'},
  {id: 3, description: 'Вариант для той, кто может оценить грацию и изящество'}
];

rings_packages = {
  1: {
    name: 'Дуэт',
    set: [{ring: 'Перстень', count: 1}, {ring: 'Колечко', count: 1}],
    cost: 4500,
    info: '1 Перстень + 1 Колечко',
    img_src: 'css/rings_packs/pack1_round.svg',
    img_src_pressed: 'css/rings_packs/pack1_round_pressed.svg'
  },
  2: {
    name: 'Триумвират',
    set: [{ring: 'Перстень', count: 1}, {ring: 'Колечко', count: 1}, {ring: 'Кольцо', count: 1}],
    cost: 6000,
    info: '1 Перстень + 1 Колечко + 1 Кольцо',
    img_src: 'css/rings_packs/pack2_round.svg',
    img_src_pressed: 'css/rings_packs/pack2_round_pressed.svg'
  },
  3: {
    name: 'Квинтет',
    set: [{ring: 'Перстень', count: 2}, {ring: 'Колечко', count: 2}, {ring: 'Кольцо', count: 1}],
    cost: 9000,
    info: '2 Перстня + 2 Колечка + 1 Кольцо',
    img_src: 'css/rings_packs/pack3_round.svg',
    img_src_pressed: 'css/rings_packs/pack3_round_pressed.svg'
  },
  4: {
    name: 'Великолепная пятерка',
    set: [{ring: 'Перстень', count: 1}, {ring: 'Колечко', count: 1}, {ring: 'Кольцо', count: 3}],
    cost: 10000,
    info: '1 Перстень + 1 Колечко + 3 Кольца',
    img_src: 'css/rings_packs/pack4_round.svg',
    img_src_pressed: 'css/rings_packs/pack4_round_pressed.svg'
  },
  5: {
    name: 'Октет',
    set: [{ring: 'Перстень', count: 3}, {ring: 'Колечко', count: 3}, {ring: 'Кольцо', count: 2}],
    cost: 15000,
    info: '3 Перстня + 3 Колечка + 2 Кольца',
    img_src: 'css/rings_packs/pack5_round.svg',
    img_src_pressed: 'css/rings_packs/pack5_round_pressed.svg'
  }
};
rings_packages_reversed = {'Дуэт': 1, 'Триумвират': 2, 'Квинтет': 3, 'Великолепная пятерка': 4, 'Октет': 5};

function update_package_icons(pack_id) {
  var icons = $(".rings-packages-icons")[0];
  for (var i = 0; i < icons.children.length; ++i) {
    if (i+1 == pack_id) {
      icons.children[i].src = rings_packages[i+1]['img_src_pressed'];
    } else {
      icons.children[i].src = rings_packages[i+1]['img_src'];
    }
  }
}

prev_package_showed = 1;
packages_is_show_now = false;
function show_package(pack_id) {
  prev_package_showed = pack_id;
  pack_info = rings_packages[pack_id];
  html_info = $(".rings-package-concrete");
  pack_img = html_info.find(".rings-package-full-img").find("img");
  pack_desc = html_info.find(".rings-package-descr");
  header = pack_desc.find("h3");
  info = pack_desc.find("p");
  price = pack_desc.find("span");
  button_add = pack_desc.find("div");

  pack_img.attr("src", pack_info['img_src']);
  header[0].innerHTML = pack_info['name'];
  info[0].innerHTML = pack_info['info'];
  price[0].innerHTML = pack_info['cost']+' Рублей';
  button_add.unbind("click");
  button_add.click(function() {
    add_package(pack_id);
  });
  update_package_icons(pack_id);
}

function remove_pack_item(target) {
  var parent = target.parentElement.parentElement.parentElement;
  target = parent;
  parent = parent.parentElement;
  parent.remove(target);
  show_or_hide_basket();
  update_summary();
}

function create_pack_item(pack_id) {
  pack_info = rings_packages[pack_id];
  item = document.createElement('div');
  item.className = "rings-basket-pack-item";
  //header
  {
    header = document.createElement('div');
    header.className = "rings-basket-pack-item-header";
      row = document.createElement('div');
      row.className = "row";
        header_left = document.createElement('div');
        header_left.className = "rings-basket-pack-header-left";
        header_left.setAttribute("align", "left");
          img_close = document.createElement('img');
          img_close.src = "css/rings_packs/huge_close.svg";
          img_close.addEventListener("click", function(event) {
            remove_pack_item(event.target);
          });
        header_left.appendChild(img_close);
          pack_name = document.createElement('h3');
          pack_name.setAttribute("data-pack-id", pack_id);
          pack_name.innerHTML = 'Пакет "'+pack_info['name']+'"';
        header_left.appendChild(pack_name);
      row.appendChild(header_left);
        header_right = document.createElement('div');
        header_right.className = "rings-basket-pack-header-right";
        header_right.setAttribute("align", "right");
          material_selecter = create_strings_selecter("Материал",
            materials, "", "rings-basket-material-arrow");
        header_right.appendChild(material_selecter);
      row.appendChild(header_right);
    header.appendChild(row);
    item.appendChild(header);
  }
  {
    body = document.createElement('div');
    body.className = "rings-basket-pack-item-body";
    variants = pack_info['set'];
    for (var i = 0; i < variants.length; ++i) {
      next = variants[i];
      for (var j = 0; j < next['count']; ++j) {
        row = document.createElement('row');
        row.className = "row";
          first = document.createElement('div');
          first.className = "rings-basket-pack-body-item";
          first.setAttribute("align", "right");
          first.innerHTML = next['ring'];
        row.appendChild(first);
          second = document.createElement('div');
          second.className = "rings-basket-pack-body-item";
          second.setAttribute("align", "left");
            size_selecter = create_strings_selecter('Размер',
              rings_sizes[next['ring']], "", "rings-basket-size-arrow");
          second.appendChild(size_selecter);
        row.appendChild(second);
        body.appendChild(row);
      }
    }
    item.appendChild(body);
  }
  return item;
}

function add_package(pack_id) {
  packs_block = $(".rings-basket-packs");
  block = create_pack_item(pack_id);
  packs_block.append(block);
  show_or_hide_basket();
  update_summary();
}

function show_packages() {
  if (!packages_is_show_now) {
    show_package(prev_package_showed);
    $(".rings-packages-packages").slideDown(1000);
  } else {
    $(".rings-packages-packages").slideUp(1000);
  }
  packages_is_show_now = !packages_is_show_now;
}

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

function show_photos(photo_number) {
  $("#overlay").fadeIn(500);
  all_height = window.innerHeight;
  slideshow = $(".slideshow");
  elem_height = slideshow.height();
  top_offset = parseInt((all_height - elem_height)/2);
  slideshow.css({"top": top_offset});
  photo_number -= 1;
  slide_text = $(".slide-text");
  ring_id = slideshow_rings_info[photo_number]['id'];
  ring_name = ring_names[ring_id];
  slide_text.empty();
    header = document.createElement('h2');
    header.innerHTML = ring_name;
    slide_text.append(header);

    price = document.createElement('div');
    local_costs = costs[ring_name];
    price.innerHTML = materials[0]+': '+local_costs[materials[0]]+' <img src="css/ruble.svg"><br>';
    //price.innerHTML += materials[1]+': '+local_costs[materials[1]]+'<br>';
    //price.innerHTML += materials[2]+': '+local_costs[materials[2]];
    slide_text.append(price);

    description = document.createElement('p');
    description.innerHTML = slideshow_rings_info[photo_number]['description'];
    slide_text.append(description);

    action_header = document.createElement('h3');
    action_header.className = "slides-action-header";
    action_header.innerHTML = date_action_header;
    slide_text.append(action_header);

    action_text = document.createElement('p');
    action_text.className = "slides-action-text";
    action_text.innerHTML = date_action_text;
    slide_text.append(action_text);

  slide_photos = $(".slide-photos");
  slide_photos.empty();
    left_control = document.createElement('div');
    left_control.className = "slide-control previous";
    left_control.addEventListener("click", move_slides_left);
    left_control.innerHTML = '<img src="css/left-arrow.svg">';
    slide_photos.append(left_control);

    slides = slideshow_photos[photo_number];
    for (i = 0; i < slides.length; ++i) {
      if ('photo' in slides[i]) {
        next_photo = document.createElement('div');
        next_photo.className = "slide-photo";
          if (i == 0)
            next_photo.className += " active";
          img = document.createElement('img');
          img.src = slides[i]['photo'];
          next_photo.appendChild(img);
        slide_photos.append(next_photo);
      } else {
        console.log('not supported');
      }
    }

    right_control = document.createElement('div');
    right_control.className = "slide-control next";
    right_control.addEventListener("click", move_slides_right);
    right_control.innerHTML = '<img src="css/right-arrow.svg">';
    slide_photos.append(right_control);


  slideshow.fadeIn(500);
  $('body').css({'overflow': 'hidden'});
}

mutex = false

function make_slide_moving(cur_slide, next_slide) {
  cur_slide.fadeOut({
    'duration': 500,
    'complete': function() {
      cur_slide.removeClass('active');
      next_slide.fadeIn({
        'duration': 500,
        'complete': function() {
          next_slide.addClass('active');
          mutex = false;
        }
      });
    }
  });
}

function move_slides_left() {
  if (mutex) return;
  mutex = true;
  cur_slide = $(".slide-photos").children(".active");
  next_slide = cur_slide.prev(".slide-photo");
  if (next_slide.length == 0) {
    next_slide = $(".slide-photos").children(".slide-photo").last();
  }
  
  make_slide_moving(cur_slide, next_slide);
}

function move_slides_right() {
  if (mutex) return;
  mutex = true;
  cur_slide = $(".slide-photos").children(".active");
  next_slide = cur_slide.next(".slide-photo");
  if (next_slide.length == 0) {
    next_slide = $(".slide-photos").children(".slide-photo").first();
  }
  
  make_slide_moving(cur_slide, next_slide);
}

function pause_all_videos_from_slides()
{
  $(".slide-photos").find("video").trigger('pause');
}

function hide_slideshow() {
  pause_all_videos_from_slides();
  $("#overlay").fadeOut(500);
  $(".slideshow").fadeOut(500);
  $('body').css({'overflow': 'auto'});
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

function aggregate_one_rings_pack(pack_) {
  var pack = $(pack_);
  var pack_id = pack.find(".rings-basket-pack-header-left")[0].children[1].getAttribute("data-pack-id");
  console.log(pack_id);
  var selecter = pack.find("select")[0];
  var material = selecter.options[selecter.selectedIndex].text;
  var rings = [];
  var body = pack.find(".rings-basket-pack-item-body")[0];
  for (var i = 0; i < body.children.length; ++i) {
    var next_row = body.children[i];
    var ring_name = next_row.children[0].innerHTML;
    selecter = $(next_row).find("select")[0];
    var ring_size = parseFloat(selecter.value);
    rings.push({'ring': ring_name, 'size': ring_size});
  }
  return {'id': pack_id, 'material': material, 'rings': rings};
}

function get_disc_info() {
  var disc = $(".rings-disc-area");
  var mark = parseFloat(disc.find(".mark").val());
  var number = parseInt(disc.find(".stud-number").val());
  return {'mark': mark, 'number': number};
}

function calc_with_disc() {
  if (total_with_disc) return;
  var values = get_disc_info();
  var target = $(".rings-basket-result");
  if (isNaN(values['number']) || isNaN(values['mark']) || (values['number'] <= 0)) {
    target.html("<div>Ошибка ввода данных для скидки</div>");
    return;
  }
  if ((values['mark'] <= 2) || (values['mark'] > 5)) {
    target.html("<div>Ошибка ввода среднего балла</div>");
    return;
  }
  var stud_number = values['number'];
  var stud_number_str = stud_number.toString();
  var year = 2000;
  var current_year = new Date().getFullYear();
  if (stud_number_str[0] == '0') {
    var year_str = stud_number_str[2]+stud_number_str[3];
    year += parseInt(year_str);
  } else if (stud_number_str[0] == '2') {
    var year_str = stud_number_str[1]+stud_number_str[2];
    year += parseInt(year_str);
  } else {
    target.html("<div>Ошибка ввода номера студенческого билета</div>");
    return;
  }

  total_cost_singles = total_cost_singles * (1 - (values['mark']*(current_year - year))/100.0);
  show_total_check();
  total_with_disc = true;
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

function get_count_and_cost_packed_basket()
{
  basket = $(".rings-basket-packs");
  rings_cnt = 0;
  cost = 0;
  target = $(".rings-basket-result");
  for (i = 0; i < basket.children().length; ++i) {
    rings_pack = basket.children()[i];
    values = aggregate_one_rings_pack(rings_pack);
    count = values['rings'].length;
    if (count < 0) {
      hide_discount();
      target.html("<div>Ошибка ввода</div>");
      return {};
    }
    rings_cnt += count;
    cost += rings_packages[values['id']]['cost'];
  }
  if (!is_number(rings_cnt) || !is_number(cost) || (rings_cnt < 0) || (cost < 0)) {
    hide_discount();
    target.html("<div>Ошибка ввода</div>")
    return {};
  }
  return {'count': rings_cnt, 'cost': cost};
}

function show_total_check() {
  var target = $(".rings-basket-result");
  total_cost_now = total_cost_singles + total_cost_packs;
  total_cost_now = parseInt(total_cost_now);
  target.html('<div>Всего выбрано колец: <span id="rings-count-id">' + total_rings_cnt_now + '</span> на сумму'+ 
          '<span class="rings-basket-result-price">'+
            total_cost_now + '<img src="css/ruble.svg">'+
          '</span>'+
        '</div>'+
        '<div class="rings-basket-result-ps">'+
          'Оплату необходимо произвести при получении'+
        '</div>'
  );
}

function update_summary() {
  total_cost_singles = 0;
  total_cost_packs = 0;
  total_rings_cnt_now = 0;
  total_with_disc = false;
  var target = $(".rings-basket-result");
  var simple_rings = get_count_and_cost_simple_basket();
  var packed_rings = get_count_and_cost_packed_basket();
  var rings_cnt = simple_rings['count'] + packed_rings['count'];
  if (rings_cnt == 0) {
    hide_discount();
    target.html("<div>Не выбрано ни одного кольца</div>");
    return;
  }
  show_discount();
  total_cost_singles = simple_rings['cost'];
  total_cost_packs = packed_rings['cost'];
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

function aggregate_packs_for_sending() {
  var basket = $(".rings-basket-packs");
  var result= [];
  for (var i = 0; i < basket.children().length; ++i) {
    var rings_pack = basket.children()[i];
    var values = aggregate_one_rings_pack(rings_pack);
    if (values['id'] <= 0) {
      return false;
    }
    result.push(values);
  }
  return result;
}

function show_or_hide_basket() {
  simple_rings = $(".rings-basket-simple");
  packed_rings = $(".rings-basket-packs");
  childs = simple_rings[0].childElementCount + packed_rings[0].childElementCount;
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
      img.src = "css/small-close.svg";
      img.addEventListener('click', remove_ring);
      close_btn.appendChild(img);

    ring_name = document.createElement('span');
    ring_name.className = "rings-basket-item-name";
    ring_name.innerHTML = name;

    //size = create_number_selecter('Размер', start_ring_size, 'float');
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
    var packs = aggregate_packs_for_sending();
    var discounts = get_disc_info();
    if (rings === false) {
      show_response_status(response_status_error_color, 'Ошибка ввода данных');
      return;
    }
    if ((rings.length == 0) && (packs.length == 0)) {
      show_response_status(response_status_error_color, 'Вы не выбрали кольцо');
      return;
    }
    fd.append("content", JSON.stringify(rings));
    fd.append("packs", JSON.stringify(packs));
    fd.append("discounts", JSON.stringify(discounts));
    local_server.onreadystatechange = function() {
      if (local_server.readyState == 4) {
        button.html("ЗАКАЗАТЬ");
        console.log(local_server.responseText);
        answer = JSON.parse(local_server.responseText);
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