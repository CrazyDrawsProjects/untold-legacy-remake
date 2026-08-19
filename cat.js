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
  var cat_id = urlParam("catId");

  if (localStorage.getItem('catsJSON'))
  {
    catsJSON = JSON.parse(localStorage.getItem('catsJSON'));
    dead_mothers = JSON.parse(localStorage.getItem('dead_mothers'));
    dead_fathers = JSON.parse(localStorage.getItem('dead_fathers'));
  }

  console.log(catsJSON);

  if (cat_id >= 0)
  {
    $(".allegience_row").remove();

    var local_cat = catsJSON.cats[cat_id];

    var local_cat_name = local_cat.name;

    $(document).prop('title', local_cat.name + " | Untold Legacy | A Paw in Each World");

    //var local_cat_symbol = "<span class='icon-thunderclan_icon'></span>";

    var flavor_descriptor_space = "";
    var color_space = "";
    var sex_space = "";
    var additional_descriptor_space = "";

    if (local_cat.flavor_descriptor === "") { /* do nothing */ } else { flavor_descriptor_space = " "; }
    if (local_cat.color === "") { /* do nothing */ } else { color_space = " "; }
    if (local_cat.sex === "") { /* do nothing */ } else { sex_space = " "; }
    if (local_cat.additional_descriptor === "") { /* do nothing */ } else { additional_descriptor_space = " "; }

    if (local_cat.picture.length > 0) { $("#cat_photo_img").attr("src","./img/cat_photos/"+local_cat.picture); }

    var local_cat_description = local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space;

    $("#cat_details_name_list").append("<li><span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(cat_id)+"''><a href='cat?catId="+cat_id+"'>"+getCatSymbolHTML(local_cat.allegience)+"<span class='name_only'>"+local_cat.name+"</span></a></span></li>");
    $("#cat_details_description_list").append("<li>"+local_cat_description+"</li>");

    var allegience_name = "";

    if (local_cat.allegience == 'ThunderClan') { allegience_name = catsJSON.clan_one_name; }
    else if (local_cat.allegience == 'ShadowClan') { allegience_name = catsJSON.clan_two_name; }
    else if (local_cat.allegience == 'WindClan') { allegience_name = catsJSON.clan_three_name; }
    else if (local_cat.allegience == 'RiverClan') { allegience_name = catsJSON.clan_four_name; }
    else if (local_cat.allegience == 'Loner') { allegience_name = catsJSON.clan_five_name; }

    $("#cat_details_allegience_list").append("<li>"+allegience_name+"</li>");

    if (local_cat.moons !== 1) {
      $("#cat_details_age_list").append("<li>"+local_cat.moons+" moons</li>");
    }
    else {
      $("#cat_details_age_list").append("<li>"+local_cat.moons+" moon</li>");
    }

    $("#cat_details_rank_list").append("<li>"+local_cat.rank+"</li>");

    if (local_cat.mother == "Unknown") { $("#cat_details_mother_list").append("<li><i>Unknown.</i></li>"); }
    else {
      if (local_cat.mother_type == "living")
      {
        $("#cat_details_mother_list").append("<li><span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(local_cat.mother)+"''><a data-toggle='tooltip' href='cat?catId="+local_cat.mother+"' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(local_cat.mother)+"\">' >"+getCatSymbolHTML(getAllegienceByIndex(local_cat.mother))+"<span class='name_only'>"+getNameByIndex(local_cat.mother)+"</span></a></span></li>");
      }
      else {
        //mother is dead
        $("#cat_details_mother_list").append("<li><span class='cat_name cat_name_and_symbol dead_cat'>"+getCatSymbolHTML(getDeadMotherAllegienceByIndex(local_cat.mother))+"<span class='name_only'>"+getDeadMotherNameByIndex(local_cat.mother)+" &dagger;</span></span></li>");
      }
    }

    if (local_cat.father == "Unknown" || local_cat.father == -1) { $("#cat_details_father_list").append("<li><i>Unknown.</i></li>"); }
    else {
      if (local_cat.father_type == "living")
      {
        $("#cat_details_father_list").append("<li><span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(local_cat.father)+"''><a data-toggle='tooltip' href='cat?catId="+local_cat.father+"' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(local_cat.father)+"\">' >"+getCatSymbolHTML(getAllegienceByIndex(local_cat.father))+"<span class='name_only'>"+getNameByIndex(local_cat.father)+"</span></a></span></li>");
      }
      else {
        //mother is dead
        $("#cat_details_father_list").append("<li><span class='cat_name cat_name_and_symbol dead_cat'>"+getCatSymbolHTML(getDeadFatherAllegienceByIndex(local_cat.father))+"<span class='name_only'>"+getDeadFatherNameByIndex(local_cat.father)+" &dagger;</span></span></li>");
      }
    }

    $("#cat_details_name").text(local_cat.name);

    //find children
    var has_children = false;
    for (var i = 0; i < catsJSON.cats.length; i++)
    {
      var local_child = catsJSON.cats[i];
      if (local_cat.sex == "tom")
      {
        //look for children; I am a father type
        if (local_child.father_type == "living" && local_child.father == cat_id)
        {
          //I am a child of this father
          $("#cat_details_children_list").append("<li><span class='cat_name cat_name_and_symbol cat_name_and_symbol "+getCatColorClassByIndex(i)+"''><a data-toggle='tooltip' href='cat?catId="+i+"' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">' >"+getCatSymbolHTML(getAllegienceByIndex(i))+"<span class='name_only'>"+getNameByIndex(i)+"</span></a></span></li>");
          has_children = true;
        }
      }
      else if (local_cat.sex == "she-cat")
      {
        //look for children; I am a mother type
        if (local_child.mother_type == "living" && local_child.mother == cat_id)
        {
          //I am a child of this mother
          $("#cat_details_children_list").append("<li><span class='cat_name cat_name_and_symbol cat_name_and_symbol "+getCatColorClassByIndex(i)+"''><a data-toggle='tooltip' href='cat?catId="+i+"' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">' >"+getCatSymbolHTML(getAllegienceByIndex(i))+"<span class='name_only'>"+getNameByIndex(i)+"</span></a></span></li>");
          has_children = true;
        }
      }
    }

    if (!has_children)
    {
      $(".children").remove();
    }

    //find mentor
    var has_mentor = false;
    for (var i = 0; i < catsJSON.cats.length; i++)
    {
      var local_mentor = catsJSON.cats[i];
      if (local_mentor.apprentice == cat_id)
      {
        //found my mentor!
        $("#cat_details_mentor_list").append("<li><span class='cat_name cat_name_and_symbol cat_name_and_symbol "+getCatColorClassByIndex(i)+"''><a data-toggle='tooltip' href='cat?catId="+i+"' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">' >"+getCatSymbolHTML(getAllegienceByIndex(i))+"<span class='name_only'>"+getNameByIndex(i)+"</span></a></span></li>");
        has_mentor = true;
      }
    }

    if (!has_mentor) { $(".mentor").remove(); }

    //find apprentices
    var has_apprentice = false;
    if (catsJSON.cats[cat_id].apprentice >= 0)
    {
      has_apprentice = true;
      $("#cat_details_apprentice_list").append("<li><span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(catsJSON.cats[cat_id].apprentice)+"''><a data-toggle='tooltip' href='cat?catId="+catsJSON.cats[cat_id].apprentice+"' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(catsJSON.cats[cat_id].apprentice)+"\">' >"+getCatSymbolHTML(getAllegienceByIndex(catsJSON.cats[cat_id].apprentice))+"<span class='name_only'>"+getNameByIndex(catsJSON.cats[cat_id].apprentice)+"</span></a></span></li>");
    }

    if (!has_apprentice) { $(".apprentice").remove(); }
  }

  //find siblings
  var has_sibling = false;

  for (var i = 0; i < catsJSON.cats.length; i++)
  {
    var sibling_shared_parents = 0; //0,1,2 (1 = half sibling)

    var local_sibling = catsJSON.cats[i];

    if (local_sibling.mother_type == local_cat.mother_type)
    {
      if (local_sibling.mother != -1 && local_sibling.mother != "Unknown")
      {
        if (local_sibling.mother == local_cat.mother)
        {
          sibling_shared_parents++;
        }
      }
    }

    if (local_sibling.father_type == local_cat.father_type)
    {
      if (local_sibling.father != -1 && local_sibling.father != "Unknown")
      {
        if (local_sibling.father == local_cat.father)
        {
          sibling_shared_parents++;
        }
      }
    }

    if (local_sibling.mother == -1 || local_sibling.mother == "Unknown")
    {
      if (local_sibling.mother == local_cat.mother && local_sibling.moons == local_cat.moons) { sibling_shared_parents++; }
    }
    if (local_sibling.father == -1 || local_sibling.father == "Unknown")
    {
      if (local_sibling.father == local_cat.father && local_sibling.moons == local_cat.moons) { sibling_shared_parents++; }
    }

    if ((local_sibling.father == -1 ||  local_sibling.father == "Unknown") && (local_sibling.mother == -1 || local_sibling.mother == "Unknown"))
    {
      sibling_shared_parents = 0;
    }

    if ((local_cat.father == -1 ||  local_cat.father == "Unknown") && (local_cat.mother == -1 || local_cat.mother == "Unknown"))
    {
      sibling_shared_parents = 0;
    }

    if (local_sibling.name == local_cat.name) { sibling_shared_parents = 0; }

    if (local_sibling.name == "deleted") { sibling_shared_parents = 0; }

    if (sibling_shared_parents == 0)
    {
      //do nothing; not siblings

    }
    else if (sibling_shared_parents >= 2 && local_sibling.moons == local_cat.moons)
    {
      //full siblings & littermates
      $("#cat_details_siblings_list").append("<li><span class='cat_name cat_name_and_symbol cat_name_and_symbol "+getCatColorClassByIndex(i)+"''><a data-toggle='tooltip' href='cat?catId="+i+"' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">' >"+getCatSymbolHTML(getAllegienceByIndex(i))+"<span class='name_only'>"+getNameByIndex(i)+" (littermate)</span></a></span></li>");
      has_sibling = true;
    }
  }

  for (var i = 0; i < catsJSON.cats.length; i++)
  {
    var sibling_shared_parents = 0; //0,1,2 (1 = half sibling)

    var local_sibling = catsJSON.cats[i];

    if (local_sibling.mother_type == local_cat.mother_type)
    {
      if (local_sibling.mother != -1 && local_sibling.mother != "Unknown")
      {
        if (local_sibling.mother == local_cat.mother)
        {
          sibling_shared_parents++;
        }
      }
    }

    if (local_sibling.father_type == local_cat.father_type)
    {
      if (local_sibling.father != -1 && local_sibling.father != "Unknown")
      {
        if (local_sibling.father == local_cat.father)
        {
          sibling_shared_parents++;
        }
      }
    }

    if (local_sibling.mother == -1 || local_sibling.mother == "Unknown")
    {
      if (local_sibling.mother == local_cat.mother && local_sibling.moons == local_cat.moons) { sibling_shared_parents++; }
    }
    if (local_sibling.father == -1 || local_sibling.father == "Unknown")
    {
      if (local_sibling.father == local_cat.father && local_sibling.moons == local_cat.moons) { sibling_shared_parents++; }
    }

    if ((local_cat.father == -1 ||  local_cat.father == "Unknown") && (local_cat.mother == -1 || local_cat.mother == "Unknown"))
    {
      sibling_shared_parents = 0;
    }

    if (local_sibling.name == local_cat.name) { sibling_shared_parents = 0; }

    if ((local_sibling.father == -1 ||  local_sibling.father == "Unknown") && (local_sibling.mother == -1 || local_sibling.mother == "Unknown"))
    {
      sibling_shared_parents = 0;
    }

    if (local_sibling.name == "deleted") { sibling_shared_parents = 0; }

    if (sibling_shared_parents == 0)
    {
      //do nothing; not siblings

    }
    else if (sibling_shared_parents >= 2 && local_sibling.moons !== local_cat.moons)
    {
      //full siblings
      $("#cat_details_siblings_list").append("<li><span class='cat_name cat_name_and_symbol cat_name_and_symbol "+getCatColorClassByIndex(i)+"''><a data-toggle='tooltip' href='cat?catId="+i+"' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">' >"+getCatSymbolHTML(getAllegienceByIndex(i))+"<span class='name_only'>"+getNameByIndex(i)+"</span></a></span></li>");
      has_sibling = true;
    }
  }

  for (var i = 0; i < catsJSON.cats.length; i++)
  {
    var sibling_shared_parents = 0; //0,1,2 (1 = half sibling)

    var local_sibling = catsJSON.cats[i];

    if (local_sibling.mother_type == local_cat.mother_type)
    {
      if (local_sibling.mother != -1 && local_sibling.mother != "Unknown")
      {
        if (local_sibling.mother == local_cat.mother)
        {
          sibling_shared_parents++;
        }
      }
    }

    if (local_sibling.father_type == local_cat.father_type)
    {
      if (local_sibling.father != -1 && local_sibling.father != "Unknown")
      {
        if (local_sibling.father == local_cat.father)
        {
          sibling_shared_parents++;
        }
      }
    }

    if (local_sibling.mother == -1 || local_sibling.mother == "Unknown")
    {
      if (local_sibling.mother == local_cat.mother && local_sibling.moons == local_cat.moons) { sibling_shared_parents++; }
    }
    if (local_sibling.father == -1 || local_sibling.father == "Unknown")
    {
      if (local_sibling.father == local_cat.father && local_sibling.moons == local_cat.moons) { sibling_shared_parents++; }
    }

    if (local_sibling.name == local_cat.name) { sibling_shared_parents = 0; }

    if ((local_sibling.father == -1 ||  local_sibling.father == "Unknown") && (local_sibling.mother == -1 || local_sibling.mother == "Unknown"))
    {
      sibling_shared_parents = 0;
    }

    if ((local_cat.father == -1 ||  local_cat.father == "Unknown") && (local_cat.mother == -1 || local_cat.mother == "Unknown"))
    {
      sibling_shared_parents = 0;
    }

    if (local_sibling.name == "deleted") { sibling_shared_parents = 0; }

    if (sibling_shared_parents == 1)
    {
      //half siblings
      $("#cat_details_siblings_list").append("<li><span class='cat_name cat_name_and_symbol cat_name_and_symbol "+getCatColorClassByIndex(i)+"''><a data-toggle='tooltip' href='cat?catId="+i+"' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">' >"+getCatSymbolHTML(getAllegienceByIndex(i))+"<span class='name_only'>"+getNameByIndex(i)+" (half sibling)</span></a></span></li>");
      has_sibling = true;
    }

  }

  if (!has_sibling) { $(".siblings").remove(); }

  //find mates
  var has_mate = false;

  var mates_already_listed = [];

  //add mates to list based on existing children
  for (var i = 0; i < catsJSON.cats.length; i++)
  {
    var local_child = catsJSON.cats[i];

    if (local_child.father_type == "living" && local_child.father >= 0 && local_child.father !== "Unknown" && local_child.father == cat_id)
    {
      //I have a living father that matches this cat's id. Check if I also have a mother.
      if (local_child.mother_type == "living" && local_child.mother >= 0 && local_child.mother !== "Unknown" && !mates_already_listed.includes(local_child.mother))
      {
        //this mom is cat_id's mate
        $("#cat_details_mates_list").append("<li><span class='cat_name cat_name_and_symbol cat_name_and_symbol "+getCatColorClassByIndex(local_child.mother)+"''><a data-toggle='tooltip' href='cat?catId="+local_child.mother+"' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(local_child.mother)+"\">' >"+getCatSymbolHTML(getAllegienceByIndex(local_child.mother))+"<span class='name_only'>"+getNameByIndex(local_child.mother)+"</span></a></span></li>");
        mates_already_listed.push(local_child.mother);
        has_mate = true;
      }
    }

    if (local_child.mother_type == "living" && local_child.mother >= 0 && local_child.mother !== "Unknown" && local_child.mother == cat_id)
    {
      //I have a living mother that matches this cat's id. Check if I also have a father.
      if (local_child.father_type == "living" && local_child.father >= 0 && local_child.father !== "Unknown" && !mates_already_listed.includes(local_child.father))
      {
        //this dad is cat_id's mate
        $("#cat_details_mates_list").append("<li><span class='cat_name cat_name_and_symbol cat_name_and_symbol "+getCatColorClassByIndex(local_child.father)+"''><a data-toggle='tooltip' href='cat?catId="+local_child.father+"' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(local_child.father)+"\">' >"+getCatSymbolHTML(getAllegienceByIndex(local_child.father))+"<span class='name_only'>"+getNameByIndex(local_child.father)+"</span></a></span></li>");
        mates_already_listed.push(local_child.father);
        has_mate = true;
      }
    }
  }

  for (var mates_i = 0; mates_i < local_cat.mates.length; mates_i++)
  {
    if (!mates_already_listed.includes(local_cat.mates[mates_i]))
    {
      $("#cat_details_mates_list").append("<li><span class='cat_name cat_name_and_symbol cat_name_and_symbol "+getCatColorClassByIndex(local_cat.mates[mates_i])+"''><a data-toggle='tooltip' href='cat?catId="+local_cat.mates[mates_i]+"' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(local_cat.mates[mates_i])+"\">' >"+getCatSymbolHTML(getAllegienceByIndex(local_cat.mates[mates_i]))+"<span class='name_only'>"+getNameByIndex(local_cat.mates[mates_i])+"</span></a></span></li>");

      mates_already_listed.push(local_cat.mates[mates_i]);
      has_mate = true;
    }

  }

  if (!has_mate) { $(".mates").remove(); }

  $('a[data-toggle="tooltip"]').tooltip({
      animated: 'fade',
      placement: 'left',
      html: true
  });
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

var getPhotoByIndex = function(index) {
  var catsArray = catsJSON.cats;
  return catsArray[index].picture;
}

var updateParent = function() {
  window.opener.$('body').trigger('updateFromWindow',{});
}


}
/*
     FILE ARCHIVED ON 22:55:27 Jul 13, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:01:00 Dec 22, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.634
  exclusion.robots: 0.023
  exclusion.robots.policy: 0.011
  esindex: 0.012
  cdx.remote: 9.738
  LoadShardBlock: 209.395 (3)
  PetaboxLoader3.datanode: 154.375 (4)
  PetaboxLoader3.resolve: 212.591 (2)
  load_resource: 188.929
*/