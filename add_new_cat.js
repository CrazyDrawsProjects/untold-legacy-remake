var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

var catsJSON = {
  "cats": [],
  "seed": null,
  "title": "",
  "clan_one_name": "ThunderClan",
  "clan_two_name": "ShadowClan",
  "clan_three_name": "WindClan",
  "clan_four_name": "RiverClan",
  "clan_five_name": "Cats Outside Clans",
  "clan_one_icon": "thunderclan",
  "clan_two_icon": "shadowclan",
  "clan_three_icon": "windclan",
  "clan_four_icon": "riverclan",
  "clan_five_icon": "noclan"
};

var cat_to_add = { "name":"NewCat", "allegience":"ThunderClan", "rank":"warrior", "sex":"she-cat", "moons":0, "mentor":"Unknown", "father":"Unknown", "mother":"Unknown", "mother_type":"living", "father_type":"living", "flavor_descriptor":"", "color":"", "additional_descriptor":"", "apprentice":-1, "picture":"color_default.jpg", "children":[], "siblings":[], "mates":[], "name_color":"black" };

var dead_mothers = { "cats": [] };
var dead_fathers = { "cats": [] };

var urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}

var initJSON = function() {
  if (localStorage.getItem('catsJSON'))
  {
    catsJSON = JSON.parse(localStorage.getItem('catsJSON'));
    dead_mothers = JSON.parse(localStorage.getItem('dead_mothers'));
    dead_fathers = JSON.parse(localStorage.getItem('dead_fathers'));
  }

  getCatPhotos();

  updateHTMLfromCatToAdd();
}

var getNameByIndex = function(index) {
  var catsArray = catsJSON.cats;

  if (index > catsArray || index < 0) { return -1; }

  return catsArray[index].name;
}

var getDeadMotherNameByIndex = function(index) {
  var catsArray = dead_mothers.cats;

  if (index > catsArray || index < 0) { return -1; }

  return catsArray[index].name;
}

var getDeadFatherNameByIndex = function(index) {
  var catsArray = dead_fathers.cats;

  if (index > catsArray || index < 0) { return -1; }

  return catsArray[index].name;
}

var getCatSymbolHTML = function(allegience) {
  if (allegience == "ThunderClan") { return "<span class='icon-"+catsJSON.clan_one_icon+"_icon'></span>"; }
  else if (allegience == "ShadowClan") { return "<span class='icon-"+catsJSON.clan_two_icon+"_icon'></span>"; }
  else if (allegience == "RiverClan") { return "<span class='icon-"+catsJSON.clan_four_icon+"_icon'></span>"; }
  else if (allegience == "WindClan") { return "<span class='icon-"+catsJSON.clan_three_icon+"_icon'></span>"; }
  else if (allegience == "Loner") { return "<span class='icon-"+catsJSON.clan_five_icon+"_icon'></span>"; }
}

var getAllegienceByIndex = function(index) {
  var catsArray = catsJSON.cats;

  return catsArray[index].allegience;
}

var getDeadFatherAllegienceByIndex = function(index) {
  var catsArray = dead_fathers.cats;

  return catsArray[index].allegience;
}

var getDeadMotherAllegienceByIndex = function(index) {
  var catsArray = dead_mothers.cats;

  return catsArray[index].allegience;
}

var getCatColorClassByIndex = function(index) {
  var catsArray = catsJSON.cats;

  var local_cat_color = catsArray[index].name_color;

  if (local_cat_color == "pale ginger" || local_cat_color == "light orange" || local_cat_color == "bright ginger") { return "color_light_orange"; }
  else if (local_cat_color == "ginger" || local_cat_color == "orange" || local_cat_color == "speckled ginger" || local_cat_color == "orange tabby") { return "color_orange"; }
  else if (local_cat_color == "dark orange" || local_cat_color == "white and ginger") { return "color_dark_orange"; }
  else if (local_cat_color == "white" || local_cat_color == "pure white" || local_cat_color == "speckled white") { return "color_white"; }
  else if (local_cat_color == "light gray" || local_cat_color == "pale gray" || local_cat_color == "gray and white" || local_cat_color == "gray and white tabby" || local_cat_color == "silver" || local_cat_color == "silvery gray" || local_cat_color == "gray") { return "color_gray"; }
  else if (local_cat_color == "dark gray and white" || local_cat_color == "dark gray") { return "color_dark_gray"; }
  else if (local_cat_color == "golden brown") { return "color_golden_brown"; }
  else if (local_cat_color == "golden" || local_cat_color == "golden tabby") { return "color_golden"; }
  else if (local_cat_color == "light brown tabby" || local_cat_color == "light tortoiseshell" || local_cat_color == "light brown" || local_cat_color == "mottled light brown") { return "color_light_brown"; }
  else if (local_cat_color == "brown" || local_cat_color == "brown tabby" || local_cat_color == "mottled brown" || local_cat_color == "speckled brown" || local_cat_color == "creamy brown") { return "color_brown"; }
  else if (local_cat_color == "dark brown tabby" || local_cat_color == "dusky brown" || local_cat_color == "dark brown" || local_cat_color == "dark tortoiseshell") { return "color_dark_brown"; }
  else if (local_cat_color == "light golden" || local_cat_color == "cream" || local_cat_color == "light cream" || local_cat_color == "cream tabby" || local_cat_color == "brown and cream" || local_cat_color == "pale tabby" || local_cat_color == "creamy") { return "color_cream"; }
  else if (local_cat_color == "dark cream") { return "color_dark_cream"; }
  else if (local_cat_color == "night-black" || local_cat_color == "black and white" || local_cat_color == "black" || local_cat_color == "dark black" || local_cat_color == "black tabby" || local_cat_color == "dark black tabby" || local_cat_color == "smoky black" || local_cat_color == "black and brown") { return "color_black"; }
  else if (local_cat_color == "reddish-brown") { return "color_reddish_brown"; }
  else if (local_cat_color == "russet colored" || local_cat_color == "red" || local_cat_color == "red tabby" || local_cat_color == "red and white") { return "color_red"; }
  else if (local_cat_color == "blue-gray" || local_cat_color == "blue-gray tabby" || local_cat_color == "bluish-gray" || local_cat_color == "blue") { return "color_blue"; }
  else if (local_cat_color == "pink") { return "color_pink"; }
}

var getCatColorClassByName = function(color_name) {
  var catsArray = catsJSON.cats;

  var local_cat_color = color_name;

  if (local_cat_color == "pale ginger" || local_cat_color == "light orange" || local_cat_color == "bright ginger") { return "color_light_orange"; }
  else if (local_cat_color == "ginger" || local_cat_color == "orange" || local_cat_color == "speckled ginger" || local_cat_color == "orange tabby") { return "color_orange"; }
  else if (local_cat_color == "dark orange" || local_cat_color == "white and ginger") { return "color_dark_orange"; }
  else if (local_cat_color == "white" || local_cat_color == "pure white" || local_cat_color == "speckled white") { return "color_white"; }
  else if (local_cat_color == "light gray" || local_cat_color == "pale gray" || local_cat_color == "gray and white" || local_cat_color == "gray and white tabby" || local_cat_color == "silver" || local_cat_color == "silvery gray" || local_cat_color == "gray") { return "color_gray"; }
  else if (local_cat_color == "dark gray and white" || local_cat_color == "dark gray") { return "color_dark_gray"; }
  else if (local_cat_color == "golden brown") { return "color_golden_brown"; }
  else if (local_cat_color == "golden" || local_cat_color == "golden tabby") { return "color_golden"; }
  else if (local_cat_color == "light brown tabby" || local_cat_color == "light tortoiseshell" || local_cat_color == "light brown" || local_cat_color == "mottled light brown") { return "color_light_brown"; }
  else if (local_cat_color == "brown" || local_cat_color == "brown tabby" || local_cat_color == "mottled brown" || local_cat_color == "speckled brown" || local_cat_color == "creamy brown") { return "color_brown"; }
  else if (local_cat_color == "dark brown tabby" || local_cat_color == "dusky brown" || local_cat_color == "dark brown" || local_cat_color == "dark tortoiseshell") { return "color_dark_brown"; }
  else if (local_cat_color == "light golden" || local_cat_color == "cream" || local_cat_color == "light cream" || local_cat_color == "cream tabby" || local_cat_color == "brown and cream" || local_cat_color == "pale tabby" || local_cat_color == "creamy") { return "color_cream"; }
  else if (local_cat_color == "dark cream") { return "color_dark_cream"; }
  else if (local_cat_color == "night-black" || local_cat_color == "black and white" || local_cat_color == "black" || local_cat_color == "dark black" || local_cat_color == "black tabby" || local_cat_color == "dark black tabby" || local_cat_color == "smoky black" || local_cat_color == "black and brown") { return "color_black"; }
  else if (local_cat_color == "reddish-brown") { return "color_reddish_brown"; }
  else if (local_cat_color == "russet colored" || local_cat_color == "red" || local_cat_color == "red tabby" || local_cat_color == "red and white") { return "color_red"; }
  else if (local_cat_color == "blue-gray" || local_cat_color == "blue-gray tabby" || local_cat_color == "bluish-gray" || local_cat_color == "blue") { return "color_blue"; }
  else if (local_cat_color == "pink") { return "color_pink"; }
}

var getPhotoByIndex = function(index) {
  var catsArray = catsJSON.cats;
  return catsArray[index].picture;
}

var getIcon = function(allegience) {
  var symbol_type = "noclan";

  if (allegience == "Loner")
  {
    symbol_type = catsJSON.clan_five_icon;
  }
  else if (allegience == "ThunderClan")
  {
    symbol_type = catsJSON.clan_one_icon;
  }
  else if (allegience == "ShadowClan")
  {
    symbol_type = catsJSON.clan_two_icon;
  }
  else if (allegience == "WindClan")
  {
    symbol_type = catsJSON.clan_three_icon;
  }
  else if (allegience == "RiverClan")
  {
    symbol_type = catsJSON.clan_four_icon;
  }


  if (symbol_type == "noclan")
  {
    return "&#xdf;";
  }
  else if (symbol_type == "thunderclan")
  {
    return "&#x2ad;";
  }
  else if (symbol_type == "shadowclan")
  {
    return "&#x1a5;";
  }
  else if (symbol_type == "windclan")
  {
    return "&#x2e9;";
  }
  else if (symbol_type == "riverclan")
  {
    return "&#x255;";
  }
  else if (symbol_type == "starclan")
  {
    return "&#x39e;";
  }
  else if (symbol_type == "skyclan")
  {
    return "&#x132;";
  }
}

var getCatPhotos = function() {
  $.ajax({
    type: "GET",
    url: "./get_all_cat_photos.js",
    data: {},
    success: function(data) {
      var photos_array = data;

      for (var i = 0; i < photos_array.length; i++)
      {
        if (photos_array[i] != "user_uploads")
        {
          $("#cat_photo_input").append("<option value='"+photos_array[i]+"'>"+photos_array[i]+"</option>");
        }
      }

      $("#cat_photo_input").val(cat_to_add.picture);

      if (cat_to_add.picture.includes("user_uploads"))
      {
        $("#cat_photo_input").append("<option class='user_upload_class' value='"+cat_to_add.picture+"'>"+cat_to_add.picture+"</option>");
        $("#cat_photo_input").val(cat_to_add.picture);
      }
    },
    error: function(data) {
      console.log("Error getting cat photos! "+data);
    },
    dataType: "json"
  });
}

var updateParent = function(json) {
  window.opener.$('body').trigger('updateFromWindow',{});

  window.close();
}

var updateHTMLfromCatToAdd = function() {
  $("#cat_photo_img").attr('src',"./img/cat_photos/"+cat_to_add.picture);
  $("#cat_photo_input").val(cat_to_add.picture);

  $("#cat_name_input").val(cat_to_add.name);

  $("#cat_name_title").text(cat_to_add.name);

  $("#cat_description_input").val(cat_to_add.color);

  $("#cat_additional_descriptor_input").val(cat_to_add.additional_descriptor);

  $("#cat_gender_input").val(cat_to_add.sex);

  $("#clan_one_allegience_option").html(getIcon("ThunderClan")+catsJSON.clan_one_name);
  $("#clan_two_allegience_option").html(getIcon("ShadowClan")+catsJSON.clan_two_name);
  $("#clan_three_allegience_option").html(getIcon("WindClan")+catsJSON.clan_three_name);
  $("#clan_four_allegience_option").html(getIcon("RiverClan")+catsJSON.clan_four_name);
  $("#clan_five_allegience_option").html(getIcon("Loner")+catsJSON.clan_five_name);

  $("#cat_name_color_input").val(cat_to_add.name_color);

  $("#cat_allegience_input").val(cat_to_add.allegience);

  $("#cat_mother_type_input").val(cat_to_add.mother_type);
  $("#cat_father_type_input").val(cat_to_add.father_type);

  $("#cat_photo_img").attr('src',"./img/cat_photos/"+cat_to_add.picture);

  //add mothers to list
  $("#cat_mother_input option").remove();
  $("#cat_mother_input").append("<option value='Unknown'>Unknown</option>");

  if (cat_to_add.mother_type == "living")
  {
    for (var i = 0; i < catsJSON.cats.length; i++)
    {
      //start with my clan only
      var local_parent = catsJSON.cats[i];
      if (local_parent.name != 'deleted' && local_parent.moons > 6 && local_parent.sex == 'she-cat' && local_parent.allegience == cat_to_add.allegience)
      {
        $("#cat_mother_input").append("<option id='mother_"+i+"' value='"+i+"'>"+getIcon(local_parent.allegience)+""+local_parent.name+"</option>");
      }
    }
    for (var i = 0; i < catsJSON.cats.length; i++)
    {
      //then rest of possible cats
      var local_parent = catsJSON.cats[i];
      if (local_parent.name != 'deleted' && local_parent.moons > 6 && local_parent.sex == 'she-cat' && local_parent.allegience != cat_to_add.allegience)
      {
        $("#cat_mother_input").append("<option id='mother_"+i+"' value='"+i+"'>"+getIcon(local_parent.allegience)+""+local_parent.name+"</option>");
      }
    }
  }
  else {
    //parent is deceased
    for (var i = 0; i < dead_mothers.cats.length; i++)
    {
      //start with my clan only
      var local_parent = dead_mothers.cats[i];
      if (local_parent.name != 'deleted' && local_parent.allegience == cat_to_add.allegience)
      {
        $("#cat_mother_input").append("<option id='dead_mother_"+i+"' value='"+i+"'>"+getIcon(local_parent.allegience)+""+local_parent.name+" &dagger;</option>");
      }
    }
    for (var i = 0; i < dead_mothers.cats.length; i++)
    {
      //then rest of possible cats
      var local_parent = dead_mothers.cats[i];
      if (local_parent.name != 'deleted' && local_parent.allegience != cat_to_add.allegience)
      {
        $("#cat_mother_input").append("<option id='dead_mother_"+i+"' value='"+i+"'>"+getIcon(local_parent.allegience)+""+local_parent.name+" &dagger;</option>");
      }
    }
  }


  //add fathers to list
  $("#cat_father_input option").remove();
  $("#cat_father_input").append("<option value='Unknown'>Unknown</option>");

  if (cat_to_add.father_type == "living")
  {
    for (var i = 0; i < catsJSON.cats.length; i++)
    {
      //start with my clan only
      var local_parent = catsJSON.cats[i];
      if (local_parent.name != 'deleted' && local_parent.moons > 6 && local_parent.sex == 'tom' && local_parent.allegience == cat_to_add.allegience)
      {
        $("#cat_father_input").append("<option id='father_"+i+"' value='"+i+"'>"+getIcon(local_parent.allegience)+""+local_parent.name+"</option>");
      }
    }
    for (var i = 0; i < catsJSON.cats.length; i++)
    {
      //then rest of possible cats
      var local_parent = catsJSON.cats[i];
      if (local_parent.name != 'deleted' && local_parent.moons > 6 && local_parent.sex == 'tom' && local_parent.allegience != cat_to_add.allegience)
      {
        $("#cat_father_input").append("<option id='father_"+i+"' value='"+i+"'>"+getIcon(local_parent.allegience)+""+local_parent.name+"</option>");
      }
    }
  }
  else {
    //parent is deceased
    for (var i = 0; i < dead_fathers.cats.length; i++)
    {
      //start with my clan only
      var local_parent = dead_fathers.cats[i];
      if (local_parent.name != 'deleted' && local_parent.allegience == cat_to_add.allegience)
      {
        $("#cat_father_input").append("<option id='dead_father_"+i+"' value='"+i+"'>"+getIcon(local_parent.allegience)+""+local_parent.name+" &dagger;</option>");
      }
    }
    for (var i = 0; i < dead_fathers.cats.length; i++)
    {
      //then rest of possible cats
      var local_parent = dead_fathers.cats[i];
      if (local_parent.name != 'deleted' && local_parent.allegience != cat_to_add.allegience)
      {
        $("#cat_father_input").append("<option id='dead_father_"+i+"' value='"+i+"'>"+getIcon(local_parent.allegience)+""+local_parent.name+" &dagger;</option>");
      }
    }
  }


  $("#cat_mother_input").val(cat_to_add.mother);
  $("#cat_father_input").val(cat_to_add.father);


  $("#cat_moons_input").val(cat_to_add.moons);

  $("#cat_apprentice_input option").remove();
  $("#cat_apprentice_input").append("<option id='apprentice_none' value='-1'></option>")
  //put apprentice-aged cats at top of the list
  for (var i = 0; i < catsJSON.cats.length; i++)
  {
    var local_apprentice = catsJSON.cats[i];
    if (local_apprentice.name != 'deleted' && local_apprentice.rank == 'apprentice' && local_apprentice.allegience == cat_to_add.allegience)
    {
      $("#cat_apprentice_input").append("<option id='apprentice_"+i+"' value='"+i+"'>"+getIcon(local_apprentice.allegience)+""+local_apprentice.name+"</option>");
    }
  }
  //then add all the rest
  for (var i = 0; i < catsJSON.cats.length; i++)
  {
    var local_apprentice = catsJSON.cats[i];
    if (local_apprentice.name != 'deleted' && local_apprentice.rank != 'apprentice' && local_apprentice.allegience == cat_to_add.allegience)
    {
      $("#cat_apprentice_input").append("<option id='apprentice_"+i+"' value='"+i+"'>"+getIcon(local_apprentice.allegience)+""+local_apprentice.name+"</option>");
    }
  }

  $("#cat_apprentice_input").val(cat_to_add.apprentice);

  if (cat_to_add.allegience != 'Loner')
  {
    $('#cat_rank_input option').remove();

    $('#cat_rank_input').append("<option value='leader'>Leader</option>");
    $('#cat_rank_input').append("<option value='deputy'>Deputy</option>");
    $('#cat_rank_input').append("<option value='medicine cat'>Medicine Cat</option>");
    $('#cat_rank_input').append("<option value='warrior'>Warrior</option>");
    $('#cat_rank_input').append("<option value='apprentice'>Apprentice</option>");
    $('#cat_rank_input').append("<option value='queen'>Queen</option>");
    $('#cat_rank_input').append("<option value='elder'>Elder</option>");
    $('#cat_rank_input').append("<option value='kitten'>Kit</option>");

    if (cat_to_add.rank == 'loner' || cat_to_add.rank == 'kittypet')
    {
      cat_to_add.rank = 'warrior';
    }
  }
  else {
    $('#cat_rank_input option').remove();

    $('#cat_rank_input').append("<option value='kittypet'>Kittypet</option>");
    $('#cat_rank_input').append("<option value='loner'>Loner</option>");

    if (cat_to_add.rank != 'loner' && cat_to_add.rank != 'kittypet')
    {
      cat_to_add.rank = 'loner';
    }
  }

  $("#cat_rank_input").val(cat_to_add.rank);
}

var updateCatToAdd = function() {
  cat_to_add.name = $("#cat_name_input").val();
  cat_to_add.color = $("#cat_description_input").val();
  cat_to_add.additional_descriptor = $("#cat_additional_descriptor_input").val();

  cat_to_add.sex = $("#cat_gender_input").val();

  cat_to_add.rank = $("#cat_rank_input").val();

  cat_to_add.allegience = $("#cat_allegience_input").val();

  cat_to_add.name_color = $("#cat_name_color_input").val();

  cat_to_add.moons = $('#cat_moons_input').val();

  cat_to_add.apprentice = $("#cat_apprentice_input").val();

  cat_to_add.mother = $("#cat_mother_input").val();
  cat_to_add.father = $("#cat_father_input").val();

  cat_to_add.picture = $("#cat_photo_input").val();

  if (cat_to_add.mother_type !== $("#cat_mother_type_input").val())
  {
    cat_to_add.mother = "Unknown";
  }
  if (cat_to_add.father_type !== $("#cat_father_type_input").val())
  {
    cat_to_add.father = "Unknown";
  }

  cat_to_add.mother_type = $("#cat_mother_type_input").val();
  cat_to_add.father_type = $("#cat_father_type_input").val();



  if (cat_to_add.mother == '') { cat_to_add.mother = 'Unknown'; }
  if (cat_to_add.father == '') { cat_to_add.father = 'Unknown'; }

  if (cat_to_add.allegience != 'Loner')
  {
    $('#cat_rank_input option').remove();

    $('#cat_rank_input').append("<option value='leader'>Leader</option>");
    $('#cat_rank_input').append("<option value='deputy'>Deputy</option>");
    $('#cat_rank_input').append("<option value='medicine cat'>Medicine Cat</option>");
    $('#cat_rank_input').append("<option value='warrior'>Warrior</option>");
    $('#cat_rank_input').append("<option value='apprentice'>Apprentice</option>");
    $('#cat_rank_input').append("<option value='queen'>Queen</option>");
    $('#cat_rank_input').append("<option value='elder'>Elder</option>");
    $('#cat_rank_input').append("<option value='kitten'>Kit</option>");

    if (cat_to_add.rank == 'loner' || cat_to_add.rank == 'kittypet')
    {
      cat_to_add.rank = 'warrior';
    }
  }
  else {
    $('#cat_rank_input option').remove();

    $('#cat_rank_input').append("<option value='kittypet'>Kittypet</option>");
    $('#cat_rank_input').append("<option value='loner'>Loner</option>");

    if (cat_to_add.rank != 'loner' && cat_to_add.rank != 'kittypet')
    {
      cat_to_add.rank = 'loner';
    }
  }

  if (cat_to_add.name == '')
  {
    cat_to_add.name = 'NewCat';
    $("#cat_name_input").val("NewCat");
  }

  if (cat_to_add.rank == 'apprentice' || cat_to_add.rank == 'kitten')
  {
    cat_to_add.apprentice = -1;
  }



  updateHTMLfromCatToAdd();
}

var addCatToJSON = function() {
  catsJSON.cats.push(cat_to_add);

  var jsonString = JSON.stringify(catsJSON);
  localStorage.setItem('catsJSON', jsonString);

  updateParent(jsonString);
}

var uploadPhotoToServer = function() {
  var dataFromFile = "";
  var fileReader = new FileReader();
  fileReader.onload = function () {
    var dataFromFile = fileReader.result;  // data <-- in this var you have the file data in Base64 format
    var base64result = dataFromFile.split(',')[1];
    var filetype = dataFromFile.split(';')[0];
    filetype = filetype.replace("data:","");
    filetype = filetype.split("/");
    filetype = filetype[1];

    $.ajax({
        url:'upload_photo.php',
        type:'POST',
        data: {
          'file': base64result,
          'filetype': filetype
        },
        success:function(data){
            //whatever you wanna do after the form is successfully submitted
            var responseData = JSON.parse(data);

            if (responseData.data == 'success')
            {
              cat_to_add.picture = responseData.new_file_name;
              uploaded_photo = responseData.new_file_name;

              $("#file_error_message").text("");

              $("#cat_photo_input .user_upload_class").remove();

              $("#cat_photo_input").append("<option class='user_upload_class' value='"+uploaded_photo+"'>"+uploaded_photo+"</option>");
              $("#cat_photo_input").val(uploaded_photo);

              updateHTMLfromCatToAdd();
            }
            else {
              var responseData = JSON.parse(data);
              $("#file_error_message").text(responseData.data);
            }
        },
        dataType: "json"
    });
  };

  fileReader.readAsDataURL($('#fileToUpload').prop('files')[0]);
}

var randomizeCat = function()
{
  var possible_allegiences = ["ThunderClan", "RiverClan", "ShadowClan", "WindClan", "ThunderClan", "RiverClan", "ShadowClan", "WindClan", "Loner"];
  cat_to_add.allegience = possible_allegiences[Math.floor(Math.random()*possible_allegiences.length)];

  if (cat_to_add.allegience == "Loner")
  {
    var possible_ranks = ["kittypet", "loner", "loner"];
  }
  else {
    var possible_ranks = ["leader", "deputy", "medicine cat", "apprentice", "apprentice", "warrior", "warrior", "warrior", "warrior", "warrior", "warrior", "warrior", "warrior", "elder", "elder", "queen", "queen", "queen", "kitten", "kitten"];
  }

  cat_to_add.rank = possible_ranks[Math.floor(Math.random()*possible_ranks.length)];

  var cat_prefix = "";
  var cat_suffix = "";

  //names taken from https://www.deviantart.com/cheerios11/journal/Big-List-of-Warrior-cat-name-Prefixes-and-Suffixes-395165921
  //Thanks to Cheerios11 for compiling this information!!
  var possible_prefixes = ["Acorn","Adder","Amber","Ant","Apple","Arch","Ash","Aspen","Badger","Bark","Beech","Beetle","Berry","Birch","Bird","Black","Blizzard","Blossom","Blue","Boulder","Bounce","Bracken","Branch","Bramble","Brave","Breeze","Briar","Bright","Brindle","Broken","Brown","Brush","Bumble","Buzzard","Cedar","Cherry","Cinder","Claw","Cloud","Cloudy","Clover","Coal","Cold","Copper","Creek","Cricket","Crooked","Crow","Daisy","Dapple","Dappled","Dark","Dawn","Dead","Deer","Dew","Dewy","Dove","Drift","Duck","Dusk","Dust","Dusty","Eagle","Ebony","Echo","Eel","Egg","Fading","Falcon","Fallen","Fallow","Fawn","Feather","Fennel","Fern","Ferret","Finch","Fire","Fish","Flame","Fleet","Flint","Flower","Fox","Frog","Frost","Furze","Fuzzy","Gold","Golden","Goose","Gorse","Gray","Grass","Green","Hail","Half","Hare","Hawk","Hay","Hazel","Heather","Heavy","Heron","Hollow","Holly","Honey","Horse","Ice","Ivy","Jagged","Jay","Jump","Juniper","Kestrel","Lake","Larch","Lark","Leaf","Leopard","Lichen","Light","Lightning","Lily","Lion","Little","Lizard","Long","Lost","Loud","Lynx","Maggot","Mallow","Marsh","Maple","Meadow","Milk","Minnow","Mint","Mink","Misty","Mole","Moon","Morning","Moss","Mossy","Moth","Mouse","Mud","Muddy","Mumble","Nettle","Newt","Night","Nut","Oak","Oat","Odd","Olive","One","Otter","Owl","Pale","Patch","Pear","Perch","Petal","Pigeon","Pike","Pine","Plum","Pool","Poppy","Pounce","Prickle","Puddle","Quail","Quick","Quiet","Rabbit","Raccoon","Ragged","Rain","Rapid","Rat","Raven","Red","Reed","Ripple","River","Robin","Rock","Rocky","Rose","Rowan","Rubble","Running","Rush","Russet","Rust","Rusty","Rye","Sage","Scorch","Sedge","Seed","Shade","Shadow","Sharp","Sheep","Shell","Shining","Short","Shrew","Shred","Silent","Silver","Sky","Slate","Slow","Small","Smoke","Snail","Snake","Sneeze","Snow","Soft","Soot","Sorrel","Spark","Sparrow","Speckle","Spider","Splash","Spot","Spotted","Spruce","Squirrel","Starling","Stone","Storm","Stumpy","Sun","Sunny","Swallow","Sweet","Swift","Tall","Talon","Tangle","Tansy","Tawny","Thistle","Thorn","Thrush","Thunder","Tiger","Timber","Tiny","Toad","Torn","Trout","Tumble","Twig","Twilight","Vine","Vole","Wasp","Weasel","Web","Weed","Wet","Whisker","White","Wild","Willow","Wind","Wolf","Yellow"];

  var possible_suffixes = ["acorn","bee","belly","berry","bird","blaze","branch","breeze","briar","bright","brook","call","claw","cloud","creek","cry","dapple","dawn","dust","ear","eyes","eye","face","fall","fang","feather","fern","fin","fire","fish","flame","flight","flower","foot","frost","fur","gaze","goose","grass","hare","hawk","heart","heather","hollow","ice","ivy","jaw","jay","leaf","leap","leg","light","mask","mist","moon","nettle","nose","nut","pad","path","pelt","petal","pool","poppy","puddle","rapid","run","scar","shade","shine","sky","snow","song","spark","speck","spirit","splash","spots","spring","stem","step","storm","streak","stream","strike","stripe","sun","swipe","tail","talon","thicket","thorn","throat","tooth","tree","tuft","water","watcher","whisker","willow","wind","wing","wish","whisper"];


  var cat_prefix = possible_prefixes[Math.floor(Math.random()*possible_prefixes.length)];
  var cat_suffix = possible_suffixes[Math.floor(Math.random()*possible_suffixes.length)];

  if (cat_to_add.rank == "apprentice")
  {
    cat_suffix = "paw";
  }
  if (cat_to_add.rank == "kitten")
  {
    cat_suffix = "kit";
  }
  if (cat_to_add.rank == "leader")
  {
    cat_suffix = "star";
  }

  if (cat_to_add.allegience == "Loner")
  {
    if (cat_to_add.rank == "loner")
    {
      if (Math.random() > 0.4)
      {
        cat_suffix = "";
      }
    }
    else if (cat_to_add.rank == "kittypet")
    {
      cat_suffix = "";
    }

  }

  cat_to_add.name = cat_prefix + cat_suffix;

  cat_to_add.moons = Math.floor(Math.random()*100)+12;

  if (cat_to_add.rank == 'leader' || cat_to_add.rank == 'deputy' && cat_to_add.moons < 30)
  {
    cat_to_add.moons += 30;
  }
  if (cat_to_add.rank == "kitten")
  {
    cat_to_add.moons = Math.floor(Math.random()*7);
  }
  if (cat_to_add.rank == "apprentice")
  {
    cat_to_add.moons = Math.floor(Math.random()*7)+6;
  }
  if (cat_to_add.rank == "elder")
  {
    cat_to_add.moons = Math.floor(Math.random()*70)+90;
  }


  var possible_sexes = ["tom", "she-cat"];

  cat_to_add.sex = possible_sexes[Math.floor(Math.random()*possible_sexes.length)];

  var possible_flavor_descriptors = ["long-haired","skinny","small","large","long-tailed","lithe","beautiful","huge","handsome","broad-shouldered","muscular","sleek","wiry","pretty","energetic","nimble","short-haired","lively","fluffy","agile","swift","fierce","long-limbed","long-legged","short-tailed","unusually","very"];

  var possible_colors = ["pale ginger","dark tortoiseshell","white","light gray","brown","ginger","dark brown tabby","light tortoiseshell","gray","silver","light brown tabby","brown tabby","pure white","dusky brown","dark brown","light brown","golden brown","golden","light golden","silvery gray","black and white","black","dark black","black tabby","dark black tabby","dark orange","orange","light orange","pale gray","dark gray and white","cream","light cream","dark cream","cream tabby","golden tabby","mottled light brown","mottled brown","reddish-brown","speckled brown","speckled white","speckled ginger","russet colored","night-black","white and ginger","smoky black","brown and cream","pale tabby","creamy brown","red","red tabby","orange tabby","blue-gray","blue-gray tabby","bluish-gray","blue","pink","gray and white","gray and white tabby","bright ginger","red and white","black and brown","creamy","white","white","white","white","black","black","brown","brown","brown","brown"];

  var possible_additional_descriptors = ["with distinctive dappled coat","with darker spots","with green eyes","with blue eyes","with white eyes","with amber eyes","with brown eyes","with hazel eyes","with emerald eyes","with white forepaws","with white back paws","with black forepaws","with a white belly","with ice-blue eyes","with icy eyes","with black stripes","with yellow eyes","with a silvery sheen","with lighter chest and paws","with a long rippling pelt","with darker orange stripes","with huge dark gray paws","with dark blue eyes","with a grumpy temper","with a cream-tipped tail","with golden-brown muzzle","with white muzzle","with pale orange stripes","with dark brown stripes","with brown flecks","with light splotches","with patches of darker fur","with long, fluffy fur","with cloudy eyes","with pointy ears","with torn ears","with a scar on their face","with one dead eye","with one missing ear","with a large scar on their back","with a huge scar on their belly","with one missing leg","with long curved claws","with sharp claws","with a strange collar","with huge teeth","with missing teeth","with a crooked smile","with a jagged white marking","with powerful hind legs","with black tipped fur","with very long whiskers","with no whiskers","with a painful burnt scar","with fluffy scruff"];

  var flavor_desc = "";

  cat_to_add.color = possible_colors[Math.floor(Math.random()*possible_colors.length)];

  cat_to_add.additional_descriptor = "";
  cat_to_add.flavor_descriptor = "";

  if (Math.random() > 0.7)
  {
    flavor_desc = possible_flavor_descriptors[Math.floor(Math.random()*possible_flavor_descriptors.length)];

    if (flavor_desc == "beautiful" && cat_to_add.sex == "tom") { flavor_desc = ""; }
    if (flavor_desc == "pretty" && cat_to_add.sex == "tom") { flavor_desc = ""; }
    if (flavor_desc == "handsome" && cat_to_add.sex == "she-cat") { flavor_desc = ""; }
  }

  if (Math.random() > 0.7)
  {
    cat_to_add.additional_descriptor = possible_additional_descriptors[Math.floor(Math.random()*possible_additional_descriptors.length)];
  }

  var save_name_color = getCatNameColor(cat_to_add.color);

  cat_to_add.name_color = getCatNameColorNoUnderscores(cat_to_add.color);

  var spacing = "";
  if (flavor_desc.length > 0) { spacing = " ";}
  cat_to_add.color = flavor_desc + spacing + cat_to_add.color;

  var color_category_name = save_name_color;

  cat_to_add.picture = "color_"+color_category_name+(Math.floor(Math.random()*10)+1)+".jpg";





  updateHTMLfromCatToAdd();
}

var getCatNameColorNoUnderscores = function(color_name) {
  if (color_name == "pale ginger" || color_name == "light orange" || color_name == "bright ginger") { return "light orange"; }
  else if (color_name == "ginger" || color_name == "orange" || color_name == "speckled ginger" || color_name == "orange tabby") { return "orange"; }
  else if (color_name == "dark orange" || color_name == "white and ginger") { return "dark orange"; }
  else if (color_name == "white" || color_name == "pure white" || color_name == "speckled white") { return "white"; }
  else if (color_name == "light gray" || color_name == "pale gray" || color_name == "gray and white" || color_name == "gray and white tabby" || color_name == "silver" || color_name == "silvery gray" || color_name == "gray") { return "gray"; }
  else if (color_name == "dark gray and white" || color_name == "dark gray") { return "dark gray"; }
  else if (color_name == "golden brown") { return "golden brown"; }
  else if (color_name == "golden" || color_name == "golden tabby") { return "golden"; }
  else if (color_name == "light brown tabby" || color_name == "light tortoiseshell" || color_name == "light brown" || color_name == "mottled light brown") { return "light brown"; }
  else if (color_name == "brown" || color_name == "brown tabby" || color_name == "mottled brown" || color_name == "speckled brown" || color_name == "creamy brown") { return "brown"; }
  else if (color_name == "dark brown tabby" || color_name == "dusky brown" || color_name == "dark brown" || color_name == "dark tortoiseshell") { return "dark brown"; }
  else if (color_name == "light golden" || color_name == "cream" || color_name == "light cream" || color_name == "cream tabby" || color_name == "brown and cream" || color_name == "pale tabby" || color_name == "creamy") { return "cream"; }
  else if (color_name == "dark cream") { return "dark cream"; }
  else if (color_name == "night-black" || color_name == "black and white" || color_name == "black" || color_name == "dark black" || color_name == "black tabby" || color_name == "dark black tabby" || color_name == "smoky black" || color_name == "black and brown") { return "black"; }
  else if (color_name == "reddish-brown") { return "reddish-brown"; }
  else if (color_name == "russet colored" || color_name == "red" || color_name == "red tabby" || color_name == "red and white") { return "red"; }
  else if (color_name == "blue-gray" || color_name == "blue-gray tabby" || color_name == "bluish-gray" || color_name == "blue") { return "blue"; }
  else if (color_name == "pink") { return "pink"; }
}

var getCatNameColor = function(color_name) {
  if (color_name == "pale ginger" || color_name == "light orange" || color_name == "bright ginger") { return "light_orange"; }
  else if (color_name == "ginger" || color_name == "orange" || color_name == "speckled ginger" || color_name == "orange tabby") { return "orange"; }
  else if (color_name == "dark orange" || color_name == "white and ginger") { return "dark_orange"; }
  else if (color_name == "white" || color_name == "pure white" || color_name == "speckled white") { return "white"; }
  else if (color_name == "light gray" || color_name == "pale gray" || color_name == "gray and white" || color_name == "gray and white tabby" || color_name == "silver" || color_name == "silvery gray" || color_name == "gray") { return "gray"; }
  else if (color_name == "dark gray and white" || color_name == "dark gray") { return "dark_gray"; }
  else if (color_name == "golden brown") { return "golden_brown"; }
  else if (color_name == "golden" || color_name == "golden tabby") { return "golden"; }
  else if (color_name == "light brown tabby" || color_name == "light tortoiseshell" || color_name == "light brown" || color_name == "mottled light brown") { return "light_brown"; }
  else if (color_name == "brown" || color_name == "brown tabby" || color_name == "mottled brown" || color_name == "speckled brown" || color_name == "creamy brown") { return "brown"; }
  else if (color_name == "dark brown tabby" || color_name == "dusky brown" || color_name == "dark brown" || color_name == "dark tortoiseshell") { return "dark_brown"; }
  else if (color_name == "light golden" || color_name == "cream" || color_name == "light cream" || color_name == "cream tabby" || color_name == "brown and cream" || color_name == "pale tabby" || color_name == "creamy") { return "cream"; }
  else if (color_name == "dark cream") { return "dark_cream"; }
  else if (color_name == "night-black" || color_name == "black and white" || color_name == "black" || color_name == "dark black" || color_name == "black tabby" || color_name == "dark black tabby" || color_name == "smoky black" || color_name == "black and brown") { return "black"; }
  else if (color_name == "reddish-brown") { return "reddish_brown"; }
  else if (color_name == "russet colored" || color_name == "red" || color_name == "red tabby" || color_name == "red and white") { return "red"; }
  else if (color_name == "blue-gray" || color_name == "blue-gray tabby" || color_name == "bluish-gray" || color_name == "blue") { return "blue"; }
  else if (color_name == "pink") { return "pink"; }
}


}
/*
     FILE ARCHIVED ON 17:40:12 May 11, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:43:18 Dec 22, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.473
  exclusion.robots: 0.018
  exclusion.robots.policy: 0.009
  esindex: 0.01
  cdx.remote: 53.067
  LoadShardBlock: 444.159 (3)
  PetaboxLoader3.datanode: 165.474 (4)
  PetaboxLoader3.resolve: 440.111 (2)
  load_resource: 180.593
*/