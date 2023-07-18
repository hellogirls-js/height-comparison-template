let nameIndex = 1;
let heightObjectCount = 0;
let personObjectCount = 0;

function drawHeightChart() {
  const FULL_HEIGHT = 220;
  const CONTAINER_HEIGHT = $("#height-canvas").innerHeight();
  const HEIGHT_INCREMENT = 10;

  for (let i = 0; i < FULL_HEIGHT; i += HEIGHT_INCREMENT) {
    let clone = $($("#scale-template").html());
    $(".scale-label-left", clone).text(`${i} cm`);
    $(".scale-label-right", clone).text(`${i} cm`);
    $(clone).height(CONTAINER_HEIGHT / (FULL_HEIGHT / HEIGHT_INCREMENT));
    $("#scale-container").prepend(clone);
  }
}

function disableItems() {
  if (heightObjectCount >= 5) {
    $("#add-person").attr("disabled", true);
  } else {
    $("#add-person").attr("disabled", false);
  }
}

function drawUserHeight() {
  const FULL_HEIGHT = 220;
  const CONTAINER_HEIGHT = $("#height-canvas").innerHeight();

  const height = $("#text-height").val();
  const clone = $($("#height-obj-template").html());
  const obj = $("<img />");
  obj.addClass("height-img-obj");
  obj.attr("src", "Human_outline_generic.svg");
  obj.attr("height", height * (CONTAINER_HEIGHT/FULL_HEIGHT));
  $(".height-img", clone).append(obj);
  $(".height-name", clone).text($("#text-name").val() || `person ${nameIndex}`)
  $(".height-number", clone).text(`${height} cm`);

  const itemClone = $($("#user-item-template").html());
  $(".user-item-name", itemClone).text($("#text-name").val() || `person ${nameIndex}`);
  $(".user-item-height", itemClone).text(`${height} cm`);
  $(".user-item-delete", itemClone).click(function(e) {
    e.preventDefault();
    $(itemClone).remove();
    $(clone).remove();
    heightObjectCount--;
    personObjectCount--;
    disableItems();
  });

  $("#height-objects").append(clone);
  $("#user-list").append(itemClone);

  heightObjectCount++;
  personObjectCount++;
  disableItems();
}

function drawCharaHeight(charaObj) {
  const FULL_HEIGHT = 220;
  const CONTAINER_HEIGHT = $("#height-canvas").innerHeight();

  let adjustedHeight = charaObj.height;
  // feel free to make adjustments for character heights to accomodate for hats, tall hair, etc
  // if you wanna make adjustments, uncomment the code below and edit it to your liking
  /*
    switch(charaObj.name) {
      case "INSERT_NAME_OF_CHARACTER_TO_ADJUST_HERE":
        adjustedHeight = charaObj.height + NUMBER_AMOUNT;
        break;
      ... COPY & PASTE THE CASE BLOCK ABOVE FOR EACH CHARACTER
      default:
        adjustedHeight = charaObj.height;
        break;
    }
   */

  const clone = $($("#height-obj-template").html());
  const img = $("<img />");
  img.addClass("height-img-obj");
  img.attr("src", charaObj.image_url);
  img.attr("height", adjustedHeight * (CONTAINER_HEIGHT/FULL_HEIGHT));

  $(".height-img", clone).append(img);
  $(".height-name", clone).text(charaObj.name)
  $(".height-number", clone).text(`${charaObj.height} cm`);

  const itemClone = $($("#character-item-template").html());
  $(".character-item-name", itemClone).text(charaObj.name);
  $(".character-item-height", itemClone).text(`${charaObj.height} cm`);
  $(".character-item-delete", itemClone).click(function(e) {
    e.preventDefault();
    $(itemClone).remove();
    $(clone).remove();
    heightObjectCount--;
    disableItems();
  });

  $("#height-objects").append(clone);
  $("#character-list").append(itemClone);

  heightObjectCount++;
  disableItems();
}

function createDropdownList(data) {
  for (let i = 0; i < data.length; i++) {
    let clone = $($("#character-list-template").html());
    $(".character-list-item-name", clone).text(data[i].name);
    $(".character-list-item-height", clone).text(`${data[i].height} cm`);
    $(clone).click(function(e) {
      // add element to chart
      if (heightObjectCount < 5) {
        drawCharaHeight(data[i]);
      }
    });
    $("#character-dropdown-list").append(clone);
  }
}

function updateVh() {
  let vh = window.innerHeight * 0.01;
  $(document.documentElement).css("--vh", `${vh}px`);

  const HEIGHT_INCREMENT = 10;
  const FULL_HEIGHT = 220;
  const CONTAINER_HEIGHT = $("#height-canvas").innerHeight();

  $("#scale-container").empty();
  for (let i = 0; i < FULL_HEIGHT; i += HEIGHT_INCREMENT) {
    let clone = $($("#scale-template").html());
    $(".scale-label-left", clone).text(`${i} cm`);
    $(".scale-label-right", clone).text(`${i} cm`);
    $(clone).height(CONTAINER_HEIGHT / (FULL_HEIGHT / HEIGHT_INCREMENT));
    $("#scale-container").prepend(clone);
  }

  if ($(".height-obj").length) {
    $(".height-obj").each(function() {
      $(this).find(".height-img-obj").attr("height", parseInt($(this).find(".height-number").text().split(' ')[0]) * (CONTAINER_HEIGHT/FULL_HEIGHT))
    })
  }
}

$(document).ready(function() {
  updateVh();
  drawHeightChart();
  console.log(HEIGHT_DATA);

  createDropdownList(HEIGHT_DATA);

  $(window).resize(_.debounce(updateVh, 100));

  $("#height-objects").sortable({
    axis: "x"
  });

  $("#add-person").click(function(e) {
    e.preventDefault();
    if ($("#text-height").val()) {
      drawUserHeight();
    }
  });

  $("#character-filter").on("input", function(e) { 
    if ($("#character-dropdown-list").css("display") !== "none") {
      $("#character-dropdown-list").empty();
      if (e.target.value.length === 0) {
        createDropdownList(HEIGHT_DATA);
      } else {
        let filteredData = HEIGHT_DATA.filter(d => d.name.toLowerCase().includes(e.target.value.toLowerCase()));
        createDropdownList(filteredData);
      }
    }
   });

  $("#character-filter").click(function(e) {
    e.preventDefault();
    $("#character-dropdown-list").slideDown("fast");
  })

  $("#toggle-dropdown").click(function(e) {
    e.preventDefault();
    $("#character-dropdown-list").slideToggle("fast");
  })
});