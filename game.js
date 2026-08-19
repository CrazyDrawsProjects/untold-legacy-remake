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

startCatsJSON = JSON.parse(JSON.stringify(catsJSON));

var editGuid = uuidv4();
var shareGuid = uuidv4();

var saveIntervalLoad = null;

var editMode = false;

var listName = "Allegiance List #"+Math.floor(Math.random()*99999999);

//thanks to broofa at StackOverflow for this concise solution for js guids! https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

var elder_moons = 120;
var kitten_moons = 6;
var apprentice_moons = 13;
var max_moons = 192;

var can_push_to_html = true;

var dead_number_of_each_gender_per_clan = 6;

var dead_mothers = { "cats": [] };
var dead_fathers = { "cats": [] };

var saveGame = function() {
  var jsonString = JSON.stringify(catsJSON);

  var deadMothersJSONString = JSON.stringify(dead_mothers);
  var deadFathersJSONString = JSON.stringify(dead_fathers);

  localStorage.setItem('catsJSON', jsonString);
  localStorage.setItem('dead_mothers', deadMothersJSONString);
  localStorage.setItem('dead_fathers', deadFathersJSONString);
}

var updateAllegianceText = function() {
  var allegiance_text = "";

  var last_was_apprentice = false;

  $( "#allegiences_paragraph *:not(:has(*)):visible" ).each(function( index ) {
    if ($(this).text() == 'Leader')
    {
      allegiance_text += "\n";
    }
    if ($(this).text() == 'Deputy')
    {
      allegiance_text += "\n";
    }
    if ($(this).text() == 'Medicine Cat')
    {
      allegiance_text += "\n";
    }
    if ($(this).text() == 'Warriors')
    {
      allegiance_text += "\n";
    }
    if ($(this).text() == 'Apprentices')
    {
      allegiance_text += "\n";
    }
    if ($(this).text() == 'Queens')
    {
      allegiance_text += "\n";
    }
    if ($(this).text() == 'Elders')
    {
      allegiance_text += "\n";
    }
    if ($(this).text() == 'Kits')
    {
      allegiance_text += "\n";
    }

    if ($(this).text() == catsJSON.clan_one_name)
    {
      allegiance_text += "\n\n";
    }
    if ($(this).text() == catsJSON.clan_two_name)
    {
      allegiance_text += "\n\n";
    }
    if ($(this).text() == catsJSON.clan_three_name)
    {
      allegiance_text += "\n\n";
    }
    if ($(this).text() == catsJSON.clan_four_name)
    {
      allegiance_text += "\n\n";
    }
    if ($(this).text() == catsJSON.clan_five_name)
    {
      allegiance_text += "\n\n";
    }

    if ($(this).text() !== 'Allegiances')
    {
      allegiance_text += $(this).text();
    }
    else {
      allegiance_text += catsJSON.title;
    }


    if ($(this).text() !== '' && !$(this).hasClass("name_only") && !$(this).text().includes("Apprentice,"))
    {
      allegiance_text += "\n";
    }

    if (last_was_apprentice && $(this).hasClass("name_only"))
    {
      last_was_apprentice = false;
      allegiance_text += "\n";
    }

    if ($(this).text().includes("Apprentice,"))
    {
      last_was_apprentice = true;
    }

    if ($(this).text() == catsJSON.clan_five_name)
    {
      allegiance_text += "\n";
    }

  });


  $("").text();

  $("#allegiance_textarea").val(allegiance_text);
}

var showAdvancedOptions = function() {
  $("#advanced_options_show").hide();
  $("#advanced_options").show();
}

var hideAdvancedOptions = function() {
  $("#advanced_options_show").show();
  $("#advanced_options").hide();
}

var resetAllegiences = function() {
  catsJSON = JSON.parse(JSON.stringify(startCatsJSON));

  listName = "Allegiance List #"+Math.floor(Math.random()*99999999);

  $("#read_only_message").hide();
  $("#saveButton").attr('value',"Save");
  $("#toggleEditButton").show();

  $("#importantLinks").hide();
  $("#savingDiv").hide();

  $("#save_spinner").hide();
  $("#save_message").text("");
  clearInterval(saveIntervalLoad);

  dead_mothers = { "cats": [] };
  dead_fathers = { "cats": [] };

  emptyCatsJSON = { "cats": [], "seed": null, "title": "" };

  localStorage.removeItem('catsJSON');

  catsJSON.seed = null;
  catsJSON.title = listName;

  initGame('refresh');

}

var normalizeParents = function() {
  for (var i = 0; i < catsJSON.cats.length; i++)
  {
    var local_cat = catsJSON.cats[i];

    if (local_cat.mates.length > 0)
    {
      for (var j = 0; j < local_cat.mates.length; j++)
      {
        var local_cat_mate = catsJSON.cats[local_cat.mates[j]];

        if (local_cat.father_type == local_cat_mate.father_type && local_cat.father == local_cat_mate.father && local_cat.father !== "Unknown")
        {
          //same father!!! We should not be mates!!!
          catsJSON.cats[i].mates.splice(j);

          for (var m = 0; m < local_cat_mate.mates.length; m++)
          {
            if (local_cat_mate.mates[m] == i)
            {
              local_cat_mate.mates.splice(m);
            }
          }

          for (var z = 0; z < local_cat.children.length; z++)
          {
            var local_child = catsJSON.cats[local_cat.children[z]];

            if (local_cat.sex == 'tom')
            {
              local_child.father_type = "living";
              local_child.father = "Unknown";
            }

            if (local_cat.sex == 'she-cat')
            {
              local_child.mother_type = "living";
              local_child.mother = "Unknown";
            }
          }
        }

        if (local_cat.mother_type == local_cat_mate.mother_type && local_cat.mother == local_cat_mate.mother && local_cat.mother !== "Unknown")
        {
          //same mother!!! We should not be mates!!!
          catsJSON.cats[i].mates.splice(j);

          for (var m = 0; m < local_cat_mate.mates.length; m++)
          {
            if (local_cat_mate.mates[m] == i)
            {
              local_cat_mate.mates.splice(m);
            }
          }

          for (var z = 0; z < local_cat.children.length; z++)
          {
            var local_child = catsJSON.cats[local_cat.children[z]];

            if (local_cat.sex == 'tom')
            {
              local_child.father_type = "living";
              local_child.father = "Unknown";
            }

            if (local_cat.sex == 'she-cat')
            {
              local_child.mother_type = "living";
              local_child.mother = "Unknown";
            }
          }
        }

        if (local_cat.mother_type == "living" && local_cat.mother == local_cat_mate)
        {
          //parent-child relationship!! We should not be mates!!!
          catsJSON.cats[i].mates.splice(j);

          for (var m = 0; m < local_cat_mate.mates.length; m++)
          {
            if (local_cat_mate.mates[m] == i)
            {
              local_cat_mate.mates.splice(m);
            }
          }

          local_cat.mother_type = "living";
          local_cat.mother = "Unknown";
        }

        if (local_cat.father_type == "living" && local_cat.father == local_cat_mate)
        {
          //parent-child relationship!! We should not be mates!!!
          catsJSON.cats[i].mates.splice(j);

          for (var m = 0; m < local_cat_mate.mates.length; m++)
          {
            if (local_cat_mate.mates[m] == i)
            {
              local_cat_mate.mates.splice(m);
            }
          }

          local_cat.father_type = "living";
          local_cat.father = "Unknown";
        }
      }
    }
  }
}

var urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}

var initGame = function(type) {
  //do nothing yet
  console.log("initializing game...");

  $("body").on("updateFromWindow", updateFromWindow);

  $("#add_new_cat_button").attr('onclick',"saveGame(); window.open('addNewCat','Add New Cat','left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800')")
  $("#add_new_ancestor_button").attr('onclick',"saveGame(); window.open('addAncestor','Add New Ancestor','left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800')");
  $("#manage_ancestors_button").attr('onclick',"saveGame(); window.open('manageAncestors','Manage Ancestors','left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800')");
  catsJSON.title = listName;

  $("#list_name").text(listName);

  var all_fun_text = ["Fire alone can save our Clan.","Beware a warrior you cannot trust.","StarClan is calling you... do not be afraid.","Beware an enemy who seems to sleep.","Four will become two, Lion and Tiger will meet in battle, and blood will rule the forest.","Darkness, Air, Water and Sky will come together and shake the forest to its roots.","Nothing will be as it is now, nor as it has been before.","Before there is peace, blood will spill blood, and the lake will run red.",
  "There will be three, the kin of the kin of the one with fire in his pelt, who will hold the power of the stars in their paws.","After the sharp-eyed jay and the roaring lion, peace will come on dove's gentle wing.","The end of the stars draw near.","Three must become four, to challenge the darkness that lasts forever.","Unite or die...","Only the blazing star can blunt the claw.",
  "A time of great change is coming for all the Clans.","Embrace what you find in the shadows, for only they can clear the sky.","The dark sky must not herald a storm.","Like fire, you will blaze through the forest.","A storm of blood and fire will sweep the forest.","When water meets blood, blood will rise.","Never trust a fox. Looks like a dog, behaves like a cat.",
  "Maybe we should be like the moon’s reflection, holding fast whatever happens?","Trust the code to lead you along the right path.","Destiny isn't a path any cat follows blindly. It is always a matter of choice, and sometimes the heart speaks loudest.","Listen to your heart, because that's where your true destiny lies.","He truly has the stars at his paws now. You will see him again, when it is time.",
  "Maybe they weren’t as strong, as clever, or as brave as you, but they still gave everything for what they believed in.","Defend your Clan, even with your life.","Do not hunt or trespass on another Clan's territory.","Elders, queens, and kits must be fed before apprentices and warriors.","Prey is killed only to be eaten. Give thanks to StarClan for its life.",
  "A kit must be at least six moons old to become an apprentice.","Newly appointed warriors will keep a silent vigil for one night after receiving their warrior name.","A cat cannot be made deputy without having mentored at least one apprentice.","The deputy will become Clan leader when the leader dies, retires or is exiled.","After the death or retirement of the deputy, the new deputy must be chosen before moonhigh.",
  "A Gathering of all four Clans is held at the full moon during a truce that lasts for the night.","Boundaries must be checked and marked daily. Challenge all trespassing cats.","No warrior can neglect a kit in pain or danger, even if the kit is from a different Clan.","The word of the Clan leader is the warrior code.",
  "An honorable warrior does not need to kill other cats to win their battles.","A warrior rejects the soft life of a kittypet.","Each Clan must help the others so that no Clan will fall.","Do you promise to defend you Clan, even at the cost of your life?","The strength and the fellowship of the Clan will always be with you, even when you hunt alone.","The elders say that the cold winds from the north blow over ShadowClan cats and chill their hearts.",
  "Keep your eyes open, Fireheart. Keep your ears pricked. Keep looking behind you. Because one day I'll find you, and then you'll be crowfood.","Hope is easy, but it catches no prey.","We cannot change our destiny. We just have to have the courage to know what it is, and accept it.","This is the place we were meant to find, and StarClan is here.","Oh great! Let's pile up all the useless cats and hope a tree falls on them.",
  "I have returned. Let vengeance begin.","This will not be the end. As long as there is breath in my body, the Clans will be safe.","I envy your faith. You can always find hope, even in the darkest moments.","I may not share your faith, but I'll always help you fight for what you believe in.","I am still leader of this Clan. And you have betrayed us all.","The first lesson of hunting is patience.","Your punishment is complete now, Crookedstar. You have lost everything.",
  "You cannot live with a paw in each world."];

  var fun_text = all_fun_text[Math.floor(Math.random()*all_fun_text.length)];

  $("#loading_modal_fun_message").text('"'+fun_text+'"');

  if (type !== 'refresh')
  {
    //hide all edit fields
    $(".editShow").hide();
  }


  //compile recently visited list
  $("#recently_visited").hide();
  $(".recently_visited_list_item").remove();
  var all_recently_visited = JSON.parse(localStorage.getItem('recentlyVisited'));
  if (all_recently_visited !== null)
  {
    if (all_recently_visited.length > 0)
    {
      $("#recently_visited").show();

      for (var guid_i = 0; guid_i < all_recently_visited.length; guid_i++)
      {
        var local_guid = all_recently_visited[guid_i];


        var math_random_tag = Math.floor(Math.random()*10000000);

        $("#recently_visited_list").append("<li class='recently_visited_list_item pop_in_"+math_random_tag+"'><a id=guid_"+local_guid+" href='http://"+window.location.hostname+window.location.pathname+"?guid="+local_guid+"'>+</a></li>");

        $(".pop_in_"+math_random_tag).hide();

        getTitleFromServer(local_guid, math_random_tag);
      }
    }

  }



  var rseed = urlParam("seed");
  console.log("Seed: "+rseed);

  var guidFromUrl = urlParam("guid");
  console.log("Guid: "+guidFromUrl);

  var shareGuidFromUrl = urlParam("shareGuid");
  console.log("shareGuid: "+shareGuidFromUrl);

  if (type == 'refresh') { rseed = null; editGuid = uuidv4(); shareGuid = uuidv4(); }

  //if ((((!localStorage.getItem('catsJSON')) || rseed != null) && guidFromUrl == null && shareGuidFromUrl == null) || (type == 'refresh'))
  if (guidFromUrl == null && shareGuidFromUrl == null || type == 'refresh')
  {
    console.log("no local storage found! Generating new Allegiance list...");

    if (rseed == null)
    {
      /*
      var d = new Date();
      var n = d.getTime();
      var new_seed = n.toString();*/

      var new_seed = (Math.floor(Math.random()*9999999999)).toString();

    }
    else
    {
      var new_seed = rseed;
      //var new_seed = (Math.floor(Math.random()*9999999999)).toString();
    }

    catsJSON.seed = new_seed;
    catsJSON.title = listName;

    Math.seedrandom(new_seed);
    window.history.replaceState(null, null, "?seed="+new_seed);

    for (var i = 0; i < total_number_of_cats; i++)
    {
      var new_cat = generateCompleteRandomCat();

      catsJSON.cats.push(new_cat);
    }

    //generate leaders
    var thunderClanLeaderName = generateRandomCatName("leader");
    var riverClanLeaderName = generateRandomCatName("leader");
    var shadowClanLeaderName = generateRandomCatName("leader");
    var windClanLeaderName = generateRandomCatName("leader");

    var thunder_clan_leader = constructCatJSON(thunderClanLeaderName,"ThunderClan","leader");
    catsJSON.cats.push(thunder_clan_leader);

    var river_clan_leader = constructCatJSON(riverClanLeaderName,"RiverClan","leader");
    catsJSON.cats.push(river_clan_leader);

    var shadow_clan_leader = constructCatJSON(shadowClanLeaderName,"ShadowClan","leader");
    catsJSON.cats.push(shadow_clan_leader);

    var wind_clan_leader = constructCatJSON(windClanLeaderName,"WindClan","leader");
    catsJSON.cats.push(wind_clan_leader);

    //promote a deputy from each clan
    var all_cats_array = catsJSON.cats;

    var promoted_tc = false;
    var promoted_rc = false;
    var promoted_sc = false;
    var promoted_wc = false;

    for (var i = 0; i < all_cats_array.length; i++)
    {
      var local_cat = all_cats_array[i];
      if ((local_cat.allegience == "ThunderClan") && (promoted_tc == false))
      {
        if (local_cat.rank == "warrior")
        {
          local_cat.rank = "deputy";
          promoted_tc = true;
        }
      }
      if ((local_cat.allegience == "ShadowClan") && (promoted_sc == false))
      {
        if (local_cat.rank == "warrior")
        {
          local_cat.rank = "deputy";
          promoted_sc = true;
        }
      }
      if ((local_cat.allegience == "RiverClan") && (promoted_rc == false))
      {
        if (local_cat.rank == "warrior")
        {
          local_cat.rank = "deputy";
          promoted_rc = true;
        }
      }
      if ((local_cat.allegience == "WindClan") && (promoted_wc == false))
      {
        if (local_cat.rank == "warrior")
        {
          local_cat.rank = "deputy";
          promoted_wc = true;
        }
      }
    }

    //promote a medicine cat from each clan
    var all_cats_array = catsJSON.cats;

    var promoted_tc_m = false;
    var promoted_rc_m = false;
    var promoted_sc_m = false;
    var promoted_wc_m = false;

    for (var i = 0; i < all_cats_array.length; i++)
    {
      var local_cat = all_cats_array[i];
      if ((local_cat.allegience == "ThunderClan") && (promoted_tc_m == false))
      {
        if (local_cat.rank == "warrior")
        {
          local_cat.rank = "medicine cat";
          promoted_tc_m = true;
        }
      }
      if ((local_cat.allegience == "ShadowClan") && (promoted_sc_m == false))
      {
        if (local_cat.rank == "warrior")
        {
          local_cat.rank = "medicine cat";
          promoted_sc_m = true;
        }
      }
      if ((local_cat.allegience == "RiverClan") && (promoted_rc_m == false))
      {
        if (local_cat.rank == "warrior")
        {
          local_cat.rank = "medicine cat";
          promoted_rc_m = true;
        }
      }
      if ((local_cat.allegience == "WindClan") && (promoted_wc_m == false))
      {
        if (local_cat.rank == "warrior")
        {
          local_cat.rank = "medicine cat";
          promoted_wc_m = true;
        }
      }
    }

    assignRelationships();

    normalizeAges();

    applyColorGenetics();

    assignMentors();

    assignCatPhotos();

    findSiblings();

    findMates();

    normalizeParents();

    pushJSONtoAllegiencesHTML();

    var intervalLoad = setInterval(function() {clearInterval(intervalLoad); $("#page_loading_modal").fadeOut(300); $("body").css("overflow-y", "scroll")}, 1000);

    saveGame();
  }
  else {
    console.log("local storage or GUID found! Pulling up Allegience from last session...");

    catsJSON = JSON.parse(localStorage.getItem('catsJSON'));
    dead_mothers = JSON.parse(localStorage.getItem('dead_mothers'));
    dead_fathers = JSON.parse(localStorage.getItem('dead_fathers'));

    if (type == 'page_load')
    {
      if (rseed == null)
      {
        if (catsJSON !== null)
          var new_seed = catsJSON.seed;

        if (new_seed == null) {
          /*var d = new Date();
          var n = d.getTime();
          new_seed = n.toString();*/

          var new_seed = (Math.floor(Math.random()*9999999999)).toString();
        }
      }
      else
      {
        //var new_seed = rseed;
        var new_seed = (Math.floor(Math.random()*9999999999)).toString();
      }
    }
    else {
      /*var d = new Date();
      var n = d.getTime();
      var new_seed = n.toString();*/

      var new_seed = (Math.floor(Math.random()*9999999999)).toString();
    }

    if (catsJSON !== null)
      catsJSON.seed = new_seed;

    if (guidFromUrl !== null && type !== 'refresh')
    {
      editGuid = guidFromUrl;

      console.log("getting data from server...");
      getDataFromServer(editGuid, "edit");
    }
    else if (shareGuidFromUrl !== null && type !== 'refresh'){
      shareGuid = shareGuidFromUrl;

      $("#read_only_message").show();
      $("#saveButton").attr('value',"Create Copy");

      $("#toggleEditButton").hide();

      getDataFromServer(shareGuid, "share");

    }
    else {
      var saveIntervalLoad = setInterval(function() {clearInterval(saveIntervalLoad); $("#page_loading_modal").fadeOut(300); $("body").css("overflow-y", "scroll")}, 1000);
    }

    if (guidFromUrl == null && shareGuidFromUrl == null)
    {
      window.history.replaceState(null, null, "?seed="+new_seed);
    }

    Math.seedrandom(new_seed);

    pushJSONtoAllegiencesHTML();

    saveGame();
  }
}

var generateRandomCatName = function(type) {
  //returns a randomly-generated Warrior Cat name.
  //type: warrior, apprentice, kitten, leader

  //names taken from https://www.deviantart.com/cheerios11/journal/Big-List-of-Warrior-cat-name-Prefixes-and-Suffixes-395165921
  //Thanks to Cheerios11 for compiling this information!!
  var possible_prefixes = ["Acorn","Adder","Amber","Ant","Apple","Arch","Ash","Aspen","Badger","Bark","Beech","Beetle","Berry","Birch","Bird","Black","Blizzard","Blossom","Blue","Boulder","Bounce","Bracken","Branch","Bramble","Brave","Breeze","Briar","Bright","Brindle","Broken","Brown","Brush","Bumble","Buzzard","Cedar","Cherry","Cinder","Claw","Cloud","Cloudy","Clover","Coal","Cold","Copper","Creek","Cricket","Crooked","Crow","Daisy","Dapple","Dappled","Dark","Dawn","Dead","Deer","Dew","Dewy","Dove","Drift","Duck","Dusk","Dust","Dusty","Eagle","Ebony","Echo","Eel","Egg","Fading","Falcon","Fallen","Fallow","Fawn","Feather","Fennel","Fern","Ferret","Finch","Fire","Fish","Flame","Fleet","Flint","Flower","Fox","Frog","Frost","Furze","Fuzzy","Gold","Golden","Goose","Gorse","Gray","Grass","Green","Hail","Half","Hare","Hawk","Hay","Hazel","Heather","Heavy","Heron","Hollow","Holly","Honey","Horse","Ice","Ivy","Jagged","Jay","Jump","Juniper","Kestrel","Lake","Larch","Lark","Leaf","Leopard","Lichen","Light","Lightning","Lily","Lion","Little","Lizard","Long","Lost","Loud","Lynx","Maggot","Mallow","Marsh","Maple","Meadow","Milk","Minnow","Mint","Mink","Misty","Mole","Moon","Morning","Moss","Mossy","Moth","Mouse","Mud","Muddy","Mumble","Nettle","Newt","Night","Nut","Oak","Oat","Odd","Olive","One","Otter","Owl","Pale","Patch","Pear","Perch","Petal","Pigeon","Pike","Pine","Plum","Pool","Poppy","Pounce","Prickle","Puddle","Quail","Quick","Quiet","Rabbit","Raccoon","Ragged","Rain","Rapid","Rat","Raven","Red","Reed","Ripple","River","Robin","Rock","Rocky","Rose","Rowan","Rubble","Running","Rush","Russet","Rust","Rusty","Rye","Sage","Scorch","Sedge","Seed","Shade","Shadow","Sharp","Sheep","Shell","Shining","Short","Shrew","Shred","Silent","Silver","Sky","Slate","Slow","Small","Smoke","Snail","Snake","Sneeze","Snow","Soft","Soot","Sorrel","Spark","Sparrow","Speckle","Spider","Splash","Spot","Spotted","Spruce","Squirrel","Starling","Stone","Storm","Stumpy","Sun","Sunny","Swallow","Sweet","Swift","Tall","Talon","Tangle","Tansy","Tawny","Thistle","Thorn","Thrush","Thunder","Tiger","Timber","Tiny","Toad","Torn","Trout","Tumble","Twig","Twilight","Vine","Vole","Wasp","Weasel","Web","Weed","Wet","Whisker","White","Wild","Willow","Wind","Wolf","Yellow"];

  var possible_suffixes = ["acorn","bee","belly","berry","bird","blaze","branch","breeze","briar","bright","brook","call","claw","cloud","creek","cry","dapple","dawn","dust","ear","eyes","eye","face","fall","fang","feather","fern","fin","fire","fish","flame","flight","flower","foot","frost","fur","gaze","goose","grass","hare","hawk","heart","heather","hollow","ice","ivy","jaw","jay","leaf","leap","leg","light","mask","mist","moon","nettle","nose","nut","pad","path","pelt","petal","pool","poppy","puddle","rapid","run","scar","shade","shine","sky","snow","song","spark","speck","spirit","splash","spots","spring","stem","step","storm","streak","stream","strike","stripe","sun","swipe","tail","talon","thicket","thorn","throat","tooth","tree","tuft","water","watcher","whisker","willow","wind","wing","wish","whisper"];


  var selected_prefix = possible_prefixes[Math.floor(Math.random()*possible_prefixes.length)];
  var selected_suffix = possible_suffixes[Math.floor(Math.random()*possible_suffixes.length)];

  if (type == "apprentice")
  {
    selected_suffix = "paw";
  }
  else if (type == "kitten")
  {
    selected_suffix = "kit";
  }
  else if (type == "leader")
  {
    selected_suffix = "star";
  }
  else if (type == "loner")
  {
    if (Math.random() > 0.4)
    {
      selected_suffix = "";
    }
  }
  else if (type == "kittypet")
  {
    selected_suffix = "";
  }

  if (selected_prefix.toLowerCase() === selected_suffix.toLowerCase())
  {
    return generateRandomCatName(type);
  }
  else {
    return selected_prefix + selected_suffix;
  }
}

var generateCompleteRandomCat = function() {
  var cat_name = "";

  var new_cat_json = {"name":"", "allegience":"", "rank":""};

  var possible_allegiences = ["ThunderClan","RiverClan","ShadowClan","WindClan"];

  var new_cat_type = "warrior";
  var random_var = Math.random();
  if (random_var < 0.2)
  {
    new_cat_type = "apprentice";
  }
  else if (random_var < 0.4)
  {
    new_cat_type = "kitten";
  }
  else if (random_var < 0.45)
  {
    if (Math.random() > 0.35)
      new_cat_type = "loner";
    else
      new_cat_type = "kittypet";
  }

  var test_boolean = true;
  while (test_boolean)
  {
    cat_name = generateRandomCatName(new_cat_type);

    var all_cats_array = catsJSON.cats;

    test_boolean = false;

    for (var i = 0; i < all_cats_array.length; i++)
    {
      var local_cat_name = all_cats_array[i].name;
      if (local_cat_name == cat_name)
      {
        test_boolean = true;
      }
    }
  }

  var new_cat_json_name = cat_name;

  redo_boolean = true;
  while (redo_boolean)
  {
    var new_cat_json_allegience = possible_allegiences[Math.floor(Math.random()*possible_allegiences.length)];
    if (new_cat_type == "loner" || new_cat_type == "kittypet")
    {
      var new_cat_json_allegience = "Loner";
    }

    var max_per_allegience = 25;
    var max_loners = 10;

    redo_boolean = false;

    var number_to_check = getNumberOfAllegienceCats(new_cat_json_allegience);
    if (number_to_check > max_per_allegience)
    {
      redo_boolean = true;
    }

    if ((number_to_check > max_loners) && (new_cat_json_allegience == "Loner"))
    {
      redo_boolean = true;
    }
  }


  var new_cat_json_rank = new_cat_type;

  return constructCatJSON(new_cat_json_name, new_cat_json_allegience, new_cat_json_rank);
}

var getNumberOfAllegienceCats = function(allegience) {
  var counter = 0;
  var all_cats_array = catsJSON.cats;

  for (var i = 0; i < all_cats_array.length; i++)
  {
    if (all_cats_array[i].allegience === allegience)
    {
      counter++;
    }
  }

  return counter;
}

var constructCatJSON = function(name, allegience, rank) {
  var possible_sexes = ["tom", "she-cat"];

  var new_cat_sex = possible_sexes[Math.floor(Math.random()*possible_sexes.length)];

  var possible_flavor_descriptors = ["long-haired","skinny","small","large","long-tailed","lithe","beautiful","huge","handsome","broad-shouldered","muscular","sleek","wiry","pretty","energetic","nimble","short-haired","lively","fluffy","agile","swift","fierce","long-limbed","long-legged","short-tailed","unusually","very"];

  var possible_colors = ["pale ginger","dark tortoiseshell","white","light gray","brown","ginger","dark brown tabby","light tortoiseshell","gray","silver","light brown tabby","brown tabby","pure white","dusky brown","dark brown","light brown","golden brown","golden","light golden","silvery gray","black and white","black","dark black","black tabby","dark black tabby","dark orange","orange","light orange","pale gray","dark gray and white","cream","light cream","dark cream","cream tabby","golden tabby","mottled light brown","mottled brown","reddish-brown","speckled brown","speckled white","speckled ginger","russet colored","night-black","white and ginger","smoky black","brown and cream","pale tabby","creamy brown","red","red tabby","orange tabby","blue-gray","blue-gray tabby","bluish-gray","blue","pink","gray and white","gray and white tabby","bright ginger","red and white","black and brown","creamy","white","white","white","white","black","black","brown","brown","brown","brown"];

  var possible_additional_descriptors = ["with distinctive dappled coat","with darker spots","with green eyes","with blue eyes","with white eyes","with amber eyes","with brown eyes","with hazel eyes","with emerald eyes","with white forepaws","with white back paws","with black forepaws","with a white belly","with ice-blue eyes","with icy eyes","with black stripes","with yellow eyes","with a silvery sheen","with lighter chest and paws","with a long rippling pelt","with darker orange stripes","with huge dark gray paws","with dark blue eyes","with a grumpy temper","with a cream-tipped tail","with golden-brown muzzle","with white muzzle","with pale orange stripes","with dark brown stripes","with brown flecks","with light splotches","with patches of darker fur","with long, fluffy fur","with cloudy eyes","with pointy ears","with torn ears","with a scar on their face","with one dead eye","with one missing ear","with a large scar on their back","with a huge scar on their belly","with one missing leg","with long curved claws","with sharp claws","with a strange collar","with huge teeth","with missing teeth","with a crooked smile","with a jagged white marking","with powerful hind legs","with black tipped fur","with very long whiskers","with no whiskers","with a painful burnt scar","with fluffy scruff"];

  new_cat_flavor_descriptor = "";
  new_cat_color = "";
  new_cat_additional_descriptor = "";

  new_cat_color = possible_colors[Math.floor(Math.random()*possible_colors.length)];

  if (Math.random() > 0.7)
  {
    new_cat_flavor_descriptor = possible_flavor_descriptors[Math.floor(Math.random()*possible_flavor_descriptors.length)];

    if (new_cat_flavor_descriptor == "beautiful" && new_cat_sex == "tom") { new_cat_flavor_descriptor = ""; }
    if (new_cat_flavor_descriptor == "pretty" && new_cat_sex == "tom") { new_cat_flavor_descriptor = ""; }
    if (new_cat_flavor_descriptor == "handsome" && new_cat_sex == "she-cat") { new_cat_flavor_descriptor = ""; }
  }

  if (Math.random() > 0.7)
  {
    new_cat_additional_descriptor = possible_additional_descriptors[Math.floor(Math.random()*possible_additional_descriptors.length)];
  }


  //moons: range 0-192
  var new_cat_moons = Math.floor(Math.random()*(max_moons-apprentice_moons))+apprentice_moons;

  if (new_cat_moons >= elder_moons)
  {
    //make it less likely that a cat will be an elder
    new_cat_moons = Math.floor(Math.random()*(max_moons-apprentice_moons))+apprentice_moons;
  }

  if (rank == "leader" || rank == "deputy")
  {
    new_cat_moons = Math.floor(Math.random()*160)+30;
  }
  else if (rank == "medicine cat")
  {
    new_cat_moons = Math.floor(Math.random()*160)+16;
  }

  if (new_cat_moons >= elder_moons && rank !== "kitten" && rank !== "apprentice" && rank !== "loner" && rank !== "kittypet" && rank !== "leader" && rank !== "deputy" && rank !== "medicine cat")
  {
    rank = "elder";
  }

  if (rank == "kitten")
  {
    new_cat_moons = Math.floor(Math.random()*kitten_moons);
  }

  if (rank == "apprentice")
  {
    new_cat_moons = Math.floor(Math.random()*(apprentice_moons-kitten_moons))+kitten_moons;
  }

  if (rank == "kitten" || rank == "apprentice")
  {
    new_cat_flavor_descriptor = "";
    new_cat_additional_descriptor = "";
  }

  new_cat_name_color = getCatNameColor(new_cat_color);

  new_cat_name_color = new_cat_name_color.replace(/_/g, ' ');

  if (new_cat_flavor_descriptor != '')
  {
    new_cat_flavor_descriptor += " ";
  }

  var new_cat_json = { "name":name, "allegience":allegience, "rank":rank, "sex":new_cat_sex, "moons":new_cat_moons, "mentor":"Unknown", "father":"Unknown", "mother":"Unknown", "flavor_descriptor":"", "color":new_cat_flavor_descriptor+new_cat_color, "additional_descriptor":new_cat_additional_descriptor, "apprentice":-1, "picture":"color_default.jpg", "children":[], "siblings":[], "mates":[], "name_color":new_cat_name_color };

  return new_cat_json;
}

var pushJSONtoAllegiencesHTML = function()
{
  if (!can_push_to_html)
  {
    return false;
  }

  $("#list_name").text(catsJSON.title);

  var all_cats_array = catsJSON.cats;

  $("#clan_one_name").text(""+catsJSON.clan_one_name);
  $("#clan_two_name").text(""+catsJSON.clan_two_name);
  $("#clan_three_name").text(""+catsJSON.clan_three_name);
  $("#clan_four_name").text(""+catsJSON.clan_four_name);
  $("#clan_five_name").text(""+catsJSON.clan_five_name);

  var html_to_insert = "";
  var id_to_insert = "";

  var tc_leader = false;
  var tc_deputy = false;
  var tc_medicine_cat = false;
  var tc_warriors = false;
  var tc_apprentices = false;
  var tc_queens = false;
  var tc_elders = false;
  var tc_kits = false;

  var sc_leader = false;
  var sc_deputy = false;
  var sc_medicine_cat = false;
  var sc_warriors = false;
  var sc_apprentices = false;
  var sc_queens = false;
  var sc_elders = false;
  var sc_kits = false;

  var wc_leader = false;
  var wc_deputy = false;
  var wc_medicine_cat = false;
  var wc_warriors = false;
  var wc_apprentices = false;
  var wc_queens = false;
  var wc_elders = false;
  var wc_kits = false;

  var rc_leader = false;
  var rc_deputy = false;
  var rc_medicine_cat = false;
  var rc_warriors = false;
  var rc_apprentices = false;
  var rc_queens = false;
  var rc_elders = false;
  var rc_kits = false;

  var l_any = false;

  $( ".allegience_row" ).remove();

  for (var i = 0; i < all_cats_array.length; i++)
  {
    var id_to_insert = "";
    var html_to_insert = "<li class='allegience_row'>";

    var style_var = 'display:none;';

    if (editMode) { style_var = ''; }

    html_to_insert += "<span class='editShow' style='"+style_var+"' id='deleteButton"+i+"'><button class='btn btn-sm btn-danger' style='padding-top:0; padding-bottom:0; margin-right:4px;' type='button' onclick='deleteCatByIndex("+i+")'><i class='fa fa-times-circle'></i></button></span>";
    html_to_insert += "<span class='editShow' style='"+style_var+"' id='editButton"+i+"'><button class='btn btn-sm btn-primary' style='padding-top:0; padding-bottom:0; margin-right:4px;' type='button' onclick='editCatByIndex("+i+")'><i class='fa fa-edit'></i> Edit</button></span>";


    var local_cat = all_cats_array[i];

    var flavor_descriptor_space = "";
    var color_space = "";
    var sex_space = "";
    var additional_descriptor_space = "";

    if (local_cat.flavor_descriptor === "") { /* do nothing */ } else { flavor_descriptor_space = " "; }
    if (local_cat.color === "") { /* do nothing */ } else { color_space = " "; }
    if (local_cat.sex === "") { /* do nothing */ } else { sex_space = " "; }
    if (local_cat.additional_descriptor === "") { /* do nothing */ } else { additional_descriptor_space = " "; }

    var local_cat_symbol = "";

    if (local_cat.allegience === "ThunderClan")
    {
      var symbol_to_get = catsJSON.clan_one_icon;

      local_cat_symbol = "<span class='icon-"+symbol_to_get+"_icon'></span>";
      if (local_cat.rank === "leader")
      {
        id_to_insert = "#thunderclan_leader_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        tc_leader = true;
      }
      else if (local_cat.rank === "deputy")
      {
        id_to_insert = "#thunderclan_deputy_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        tc_deputy = true;
      }
      else if (local_cat.rank === "medicine cat")
      {
        id_to_insert = "#thunderclan_medicine_cat_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        tc_medicine_cat = true;
      }
      else if (local_cat.rank == "warrior")
      {
        id_to_insert = "#thunderclan_warriors_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        tc_warriors = true;
      }
      else if (local_cat.rank === "apprentice")
      {
        id_to_insert = "#thunderclan_apprentices_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        tc_apprentices = true;
      }
      else if (local_cat.rank === "queen")
      {
        id_to_insert = "#thunderclan_queens_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        tc_queens = true;
      }
      else if (local_cat.rank === "elder")
      {
        id_to_insert = "#thunderclan_elders_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        tc_elders = true;
      }
      else if (local_cat.rank === "kitten")
      {
        id_to_insert = "#thunderclan_kits_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        tc_kits = true;
      }
    }

    //shadowclan
    if (local_cat.allegience === "ShadowClan")
    {
      var symbol_to_get = catsJSON.clan_two_icon;

      local_cat_symbol = "<span class='icon-"+symbol_to_get+"_icon'></span>";
      if (local_cat.rank === "leader")
      {
        id_to_insert = "#shadowclan_leader_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        sc_leader = true;
      }
      else if (local_cat.rank === "deputy")
      {
        id_to_insert = "#shadowclan_deputy_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        sc_deputy = true;
      }
      else if (local_cat.rank === "medicine cat")
      {
        id_to_insert = "#shadowclan_medicine_cat_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        sc_medicine_cat = true;
      }
      else if (local_cat.rank == "warrior")
      {
        id_to_insert = "#shadowclan_warriors_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        sc_warriors = true;
      }
      else if (local_cat.rank === "apprentice")
      {
        id_to_insert = "#shadowclan_apprentices_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        sc_apprentices = true;
      }
      else if (local_cat.rank === "queen")
      {
        id_to_insert = "#shadowclan_queens_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        sc_queens = true;
      }
      else if (local_cat.rank === "elder")
      {
        id_to_insert = "#shadowclan_elders_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        sc_elders = true;
      }
      else if (local_cat.rank === "kitten")
      {
        id_to_insert = "#shadowclan_kits_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        sc_kits = true;
      }
    }

    //windclan
    if (local_cat.allegience === "WindClan")
    {
      var symbol_to_get = catsJSON.clan_three_icon;

      local_cat_symbol = "<span class='icon-"+symbol_to_get+"_icon'></span>";
      if (local_cat.rank === "leader")
      {
        id_to_insert = "#windclan_leader_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        wc_leader = true;
      }
      else if (local_cat.rank === "deputy")
      {
        id_to_insert = "#windclan_deputy_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        wc_deputy = true;
      }
      else if (local_cat.rank === "medicine cat")
      {
        id_to_insert = "#windclan_medicine_cat_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        wc_medicine_cat = true;
      }
      else if (local_cat.rank == "warrior")
      {
        id_to_insert = "#windclan_warriors_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        wc_warriors = true;
      }
      else if (local_cat.rank === "apprentice")
      {
        id_to_insert = "#windclan_apprentices_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        wc_apprentices = true;
      }
      else if (local_cat.rank === "queen")
      {
        id_to_insert = "#windclan_queens_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        wc_queens = true;
      }
      else if (local_cat.rank === "elder")
      {
        id_to_insert = "#windclan_elders_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        wc_elders = true;
      }
      else if (local_cat.rank === "kitten")
      {
        id_to_insert = "#windclan_kits_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        wc_kits = true;
      }
    }

    //riverclan
    if (local_cat.allegience === "RiverClan")
    {
      var symbol_to_get = catsJSON.clan_four_icon;

      local_cat_symbol = "<span class='icon-"+symbol_to_get+"_icon'></span>";
      if (local_cat.rank === "leader")
      {
        id_to_insert = "#riverclan_leader_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        rc_leader = true;
      }
      else if (local_cat.rank === "deputy")
      {
        id_to_insert = "#riverclan_deputy_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        rc_deputy = true;
      }
      else if (local_cat.rank === "medicine cat")
      {
        id_to_insert = "#riverclan_medicine_cat_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        rc_medicine_cat = true;
      }
      else if (local_cat.rank == "warrior")
      {
        id_to_insert = "#riverclan_warriors_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        rc_warriors = true;
      }
      else if (local_cat.rank === "apprentice")
      {
        id_to_insert = "#riverclan_apprentices_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>";
        rc_apprentices = true;
      }
      else if (local_cat.rank === "queen")
      {
        id_to_insert = "#riverclan_queens_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>"+"</span>";
        rc_queens = true;
      }
      else if (local_cat.rank === "elder")
      {
        id_to_insert = "#riverclan_elders_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>"+"</span>";
        rc_elders = true;
      }
      else if (local_cat.rank === "kitten")
      {
        id_to_insert = "#riverclan_kits_list";
        html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>"+"</span>";
        rc_kits = true;
      }
    }

    //loners
    if (local_cat.allegience === "Loner")
    {
      var symbol_to_get = catsJSON.clan_five_icon;

      local_cat_symbol = "<span class='icon-"+symbol_to_get+"_icon'></span>";

      id_to_insert = "#cats_outside_clans_list";
      html_to_insert += "<span class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a target='_blank' class='cat_name cat_name_and_symbol "+getCatColorClassByIndex(i)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(i)+"\">'  onclick=\"saveGame(); window.open(\'cat?catId="+i+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+local_cat.name+"</span>"+"</a></span><span> - "+local_cat.flavor_descriptor+flavor_descriptor_space+local_cat.color+color_space+local_cat.sex+sex_space+local_cat.additional_descriptor+additional_descriptor_space+"</span>"+"</span>";
      l_any = true;
    }

    html_to_insert += "</li>";

    if (local_cat.apprentice >= 0)
    {
      html_to_insert += "<li class='allegience_row apprentice_plate'><span class='cat_name'><span>Apprentice, </span><span class='cat_name_and_symbol "+getCatColorClassByIndex(local_cat.apprentice)+"'><a data-toggle='tooltip' title='<img src=\"./img/cat_photos/"+getPhotoByIndex(local_cat.apprentice)+"\">' onclick=\"saveGame(); window.open(\'cat?catId="+local_cat.apprentice+"\',\'Cat Details\',\'left="+screen.width/2+",top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800\')\">"+local_cat_symbol+"<span class='name_only'>"+getNameByIndex(local_cat.apprentice)+"</span></a></span></span></li>";
    }

    if (id_to_insert.length > 0)
    {
      $(id_to_insert).append(html_to_insert);
    }
  }



  //fill in with "nones" if categories are empty.
  var html_none = "<li class='allegience_row'><i>None.</i></li>";

  if (!tc_leader) { $("#thunderclan_leader_list").append(html_none); }
  if (!tc_deputy) { $("#thunderclan_deputy_list").append(html_none); }
  if (!tc_medicine_cat) { $("#thunderclan_medicine_cat_list").append(html_none); }
  if (!tc_warriors) { $("#thunderclan_warriors_list").append(html_none); }
  if (!tc_apprentices) { $("#thunderclan_apprentices_list").append(html_none); }
  if (!tc_queens) { $("#thunderclan_queens_list").append(html_none); }
  if (!tc_elders) { $("#thunderclan_elders_list").append(html_none); }
  if (!tc_kits) { $("#thunderclan_kits_list").append(html_none); }

  if (!sc_leader) { $("#shadowclan_leader_list").append(html_none); }
  if (!sc_deputy) { $("#shadowclan_deputy_list").append(html_none); }
  if (!sc_medicine_cat) { $("#shadowclan_medicine_cat_list").append(html_none); }
  if (!sc_warriors) { $("#shadowclan_warriors_list").append(html_none); }
  if (!sc_apprentices) { $("#shadowclan_apprentices_list").append(html_none); }
  if (!sc_queens) { $("#shadowclan_queens_list").append(html_none); }
  if (!sc_elders) { $("#shadowclan_elders_list").append(html_none); }
  if (!sc_kits) { $("#shadowclan_kits_list").append(html_none); }

  if (!wc_leader) { $("#windclan_leader_list").append(html_none); }
  if (!wc_deputy) { $("#windclan_deputy_list").append(html_none); }
  if (!wc_medicine_cat) { $("#windclan_medicine_cat_list").append(html_none); }
  if (!wc_warriors) { $("#windclan_warriors_list").append(html_none); }
  if (!wc_apprentices) { $("#windclan_apprentices_list").append(html_none); }
  if (!wc_queens) { $("#windclan_queens_list").append(html_none); }
  if (!wc_elders) { $("#windclan_elders_list").append(html_none); }
  if (!wc_kits) { $("#windclan_kits_list").append(html_none); }

  if (!rc_leader) { $("#riverclan_leader_list").append(html_none); }
  if (!rc_deputy) { $("#riverclan_deputy_list").append(html_none); }
  if (!rc_medicine_cat) { $("#riverclan_medicine_cat_list").append(html_none); }
  if (!rc_warriors) { $("#riverclan_warriors_list").append(html_none); }
  if (!rc_apprentices) { $("#riverclan_apprentices_list").append(html_none); }
  if (!rc_queens) { $("#riverclan_queens_list").append(html_none); }
  if (!rc_elders) { $("#riverclan_elders_list").append(html_none); }
  if (!rc_kits) { $("#riverclan_kits_list").append(html_none); }

  if (!l_any) { $("#cats_outside_clans_list").append(html_none); }

  $('a[data-toggle="tooltip"]').tooltip({
      animated: 'fade',
      placement: 'left',
      html: true
  });

  $('li[data-toggle="tooltip"]').tooltip({
      animated: 'fade',
      placement: 'right',
      html: true
  });

  updateAllegianceText();
}

var assignRelationships = function()
{
  generateDeadRelatives();

  var father_index = -1;
  var mother_index = -1;

  var all_cats_array = catsJSON.cats;

  //give living she-cats a preference of mate
  for (var i = 0; i < all_cats_array.length; i++)
  {
    var local_cat = all_cats_array[i];

    all_cats_array[i].father = -1;
    all_cats_array[i].mother = -1;

    local_cat.father = -1;
    local_cat.mother = -1;

    if (local_cat.sex === "she-cat")
    {
      local_cat.preferred_mate = -1;
    }

    if (local_cat.sex === "she-cat" && (local_cat.rank == "warrior" || local_cat.rank == "elder" || local_cat.rank == "leader" || local_cat.rank == "deputy"))
    {
      if (Math.random() > 0.35) {
        //would like to have children
        var all_eligible_tom_indexes = [];
        for (j = 0; j < all_cats_array.length; j++)
        {
          var local_tom = all_cats_array[j];
          if (local_tom.sex == "tom" && local_tom.rank !== "apprentice" && local_tom.rank !== "kitten" && (local_tom.rank !== "medicine cat" || Math.random()*100 > 85) && local_tom.moons > 12)
          {
            if (j != local_cat.father && local_tom.father != local_cat.father && local_tom.mother != local_cat.mother&& local_tom.moons > local_cat.moons && local_tom.moons > apprentice_moons)
            {
              all_eligible_tom_indexes.push(j);
            }
          }
        }

        local_cat.preferred_mate = all_eligible_tom_indexes[Math.floor(Math.random()*all_eligible_tom_indexes.length)];

        var all_eligible_tom_within_my_clan_indexes = [];
        for (j = 0; j < all_cats_array.length; j++)
        {
          var local_tom = all_cats_array[j];
          if (local_tom.sex == "tom" && local_tom.allegience == local_cat.allegience && local_tom.rank !== "apprentice" && local_tom.rank !== "kitten" && (local_tom.rank !== "medicine cat" || Math.random()*100 > 85) && local_tom.moons > local_cat.moons && local_tom.moons > apprentice_moons)
          {
            all_eligible_tom_within_my_clan_indexes.push(j);
          }
        }

        //prefer my own clan over others
        if (Math.random() > 0.1)
        {
          local_cat.preferred_mate = all_eligible_tom_within_my_clan_indexes[Math.floor(Math.random()*all_eligible_tom_within_my_clan_indexes.length)];
        }
      }
      else {
        //no need for children here!
        local_cat.preferred_mate = -1;
      }
    }
  }

  for (var i = 0; i < all_cats_array.length; i++)
  {

    var local_cat = all_cats_array[i];

    local_cat.mother = -1;
    local_cat.father = -1;

    if (local_cat.moons < 48)
    {

      //likely has a living mother or father
      local_cat.mother_type = "living";
      local_cat.father_type = "living";

      var mother_index = -1;
      var mother_mate_index = -1;

      var all_eligible_mothers = [];
      for (var j = 0; j < all_cats_array.length; j++)
      {
        var local_mother = all_cats_array[j];
        if (local_mother.sex == "she-cat" && local_mother.moons >= local_cat.moons+12 && local_mother.allegience == local_cat.allegience && local_mother.preferred_mate > -1 && local_mother.rank !== "apprentice" && local_mother.rank !== "kitten" && (local_mother.rank !== "medicine cat" || Math.random()*100 > 85))
        {
          //eligible mother
          all_eligible_mothers.push(j);
        }
      }

      if (all_eligible_mothers.length > 0)
      {
        mother_index = all_eligible_mothers[Math.floor(Math.random()*all_eligible_mothers.length)];
      }
      else {
        mother_index = -1;
      }


      if (mother_index >= 0 && mother_index !== "Unknown")
      {
        father_index = all_cats_array[mother_index].preferred_mate;

        if (all_cats_array[father_index].moons < local_cat.moons+6)
        {
          father_index = -1;
        }

        if (father_index >= 0 && father_index !== "Unknown")
        {
          if (getNameByIndex(father_index) == local_cat.name)
          {
            father_index = -1;
          }
        }
      }

      if (father_index >= 0 && father_index !== "Unknown" && local_cat.father_type == "living")
      {
        if (catsJSON.cats[father_index].moons <= local_cat.moons+12)
        {
          father_index = -1;
        }
      }

      if (mother_index >= 0 && mother_index !== "Unknown" && local_cat.mother_type == "living")
      {
        if (catsJSON.cats[mother_index].moons <= local_cat.moons+12)
        {
          mother_index = -1;
        }
      }

      if (father_index >= 0 && father_index !== 'Unknown' && local_cat.father_type == "living")
      {
        if (catsJSON.cats[father_index].sex == 'she-cat')
        {
          father_index = -1;
        }
      }

      if (mother_index >= 0 && mother_index !== 'Unknown' && local_cat.mother_type == "living")
      {
        if (catsJSON.cats[mother_index].sex == 'tom')
        {
          mother_index = -1;
        }
      }

      local_cat.mother = mother_index;
      local_cat.father = father_index;

      if (mother_index >= 0 && local_cat.mother_type == "living" && mother_index != "Unknown")
      {
        addToArrayUnique(catsJSON.cats[mother_index].children,i);
      }
      if (father_index >= 0 && local_cat.father_type == "living" && father_index != "Unknown")
      {
        addToArrayUnique(catsJSON.cats[father_index].children,i);
      }

      if (mother_index >= 0 && local_cat.mother_type == "living" && mother_index != "Unknown")
      {
        addToArrayUnique(catsJSON.cats[mother_index].children,i);
      }
      if (father_index >= 0 && local_cat.father_type == "living" && father_index != "Unknown")
      {
        addToArrayUnique(catsJSON.cats[father_index].children,i);
      }

      if (local_cat.mother == -1) { local_cat.mother = "Unknown"; }
      if (local_cat.father == -1) { local_cat.father = "Unknown"; }

    }
    else {
      //likely has a dead mother or father
      local_cat.mother_type = "dead";
      local_cat.father_type = "dead";

      var mother_index = Math.floor(Math.random()*dead_mothers.cats.length);

      var mother_mate_index = -1;

      if (Math.random() > 0.2)
      {
        mother_index = Math.floor(Math.random()*dead_number_of_each_gender_per_clan);

        var counter = 0;

        for (var j = 0; j < dead_mothers.cats.length; j++)
        {
          if (dead_mothers.cats[j].allegience == local_cat.allegience)
          {
            if (counter == mother_index) { mother_index = j; mother_mate_index = dead_mothers.cats[j].likely_mate_index; j = 1000; }
            counter++;
          }
        }
      }
      else {
        //do nothing
      }

      father_index = -1;

      if (Math.random() > 0.2)
      {
        var counter = 0;

        //most likely born of my mother's mate
        for (var j = 0; j < dead_fathers.cats.length; j++)
        {
          if (dead_fathers.cats[j].allegience == local_cat.allegience)
          {
            if (counter == mother_mate_index)
            {
              var father_index = j;
            }
            counter++;
          }
        }
      }
      else {
        var father_index = Math.floor(Math.random()*dead_fathers.cats.length);

        if (Math.random() > 0.9)
        {
          father_index = -1;
        }
      }

      if (Math.random() > 0.9)
      {
        mother_index = -1;
      }
      if (Math.random() > 0.9)
      {
        father_index = -1;
      }

      local_cat.mother = mother_index;
      local_cat.father = father_index;

      if (mother_index >= 0 && local_cat.mother_type == "living" && mother_index != "Unknown")
      {
        addToArrayUnique(catsJSON.cats[mother_index].children,i);
      }
      if (father_index >= 0 && local_cat.father_type == "living" && father_index != "Unknown")
      {
        addToArrayUnique(catsJSON.cats[father_index].children,i);
      }

      if (local_cat.mother == -1) { local_cat.mother = "Unknown"; }
      else if (local_cat.father == -1) { local_cat.father = "Unknown"; }
    }
  }

  promoteQueens();
}

var generateDeadRelatives = function() {


  //thunderclan
  var tc_leader = false;
  for (var i = 0; i < dead_number_of_each_gender_per_clan; i++)
  {
    //mothers
    var dead_rank = "warrior";
    if (Math.random() > 0.9 && tc_leader == false) { dead_rank = "leader"; tc_leader = true; }
    var new_relative_name = generateRandomCatName(dead_rank);

    var dead_name = new_relative_name;
    var dead_allegience = "ThunderClan"
    var dead_likely_mate_index = Math.floor(Math.random()*dead_number_of_each_gender_per_clan);

    var dead_possible_colors = ["pale ginger","dark tortoiseshell","white","light gray","brown","ginger","dark brown tabby","light tortoiseshell","gray","silver","light brown tabby","brown tabby","pure white","dusky brown","dark brown","light brown","golden brown","golden","light golden","silvery gray","black and white","black","dark black","black tabby","dark black tabby","dark orange","orange","light orange","pale gray","dark gray and white","cream","light cream","dark cream","cream tabby","golden tabby","mottled light brown","mottled brown","reddish-brown","speckled brown","speckled white","speckled ginger","russet colored","night-black","white and ginger","smoky black","brown and cream","pale tabby","creamy brown","red","red tabby","orange tabby","blue-gray","blue-gray tabby","bluish-gray","blue","pink","gray and white","gray and white tabby","bright ginger","red and white","black and brown","creamy","white","white","white","white","black","black","brown","brown","brown","brown"];

    dead_cat_color = "";
    dead_cat_color = dead_possible_colors[Math.floor(Math.random()*dead_possible_colors.length)];

    var new_dead_cat = {"name":dead_name, "allegience":dead_allegience, "likely_mate_index":dead_likely_mate_index, "color":dead_cat_color};
    dead_mothers.cats.push(new_dead_cat);

    //fathers
    var dead_rank = "warrior";
    if (Math.random() > 0.9 && tc_leader == false) { dead_rank = "leader"; tc_leader = true; }
    var new_relative_name = generateRandomCatName(dead_rank);

    var dead_possible_colors = ["pale ginger","dark tortoiseshell","white","light gray","brown","ginger","dark brown tabby","light tortoiseshell","gray","silver","light brown tabby","brown tabby","pure white","dusky brown","dark brown","light brown","golden brown","golden","light golden","silvery gray","black and white","black","dark black","black tabby","dark black tabby","dark orange","orange","light orange","pale gray","dark gray and white","cream","light cream","dark cream","cream tabby","golden tabby","mottled light brown","mottled brown","reddish-brown","speckled brown","speckled white","speckled ginger","russet colored","night-black","white and ginger","smoky black","brown and cream","pale tabby","creamy brown","red","red tabby","orange tabby","blue-gray","blue-gray tabby","bluish-gray","blue","pink","gray and white","gray and white tabby","bright ginger","red and white","black and brown","creamy","white","white","white","white","black","black","brown","brown","brown","brown"];

    dead_cat_color = "";
    dead_cat_color = dead_possible_colors[Math.floor(Math.random()*dead_possible_colors.length)];

    var dead_name = new_relative_name;
    var dead_allegience = "ThunderClan"
    var dead_likely_mate_index = Math.floor(Math.random()*dead_number_of_each_gender_per_clan);

    var new_dead_cat = {"name":dead_name, "allegience":dead_allegience, "likely_mate_index":dead_likely_mate_index, "color":dead_cat_color};
    dead_fathers.cats.push(new_dead_cat);
  }

  //riverclan
  var rc_leader = false;
  for (var i = 0; i < dead_number_of_each_gender_per_clan; i++)
  {
    //mothers
    var dead_rank = "warrior";
    if (Math.random() > 0.9 && rc_leader == false) { dead_rank = "leader"; rc_leader = true; }
    var new_relative_name = generateRandomCatName(dead_rank);

    var dead_name = new_relative_name;
    var dead_allegience = "RiverClan"
    var dead_likely_mate_index = Math.floor(Math.random()*dead_number_of_each_gender_per_clan);

    var dead_possible_colors = ["pale ginger","dark tortoiseshell","white","light gray","brown","ginger","dark brown tabby","light tortoiseshell","gray","silver","light brown tabby","brown tabby","pure white","dusky brown","dark brown","light brown","golden brown","golden","light golden","silvery gray","black and white","black","dark black","black tabby","dark black tabby","dark orange","orange","light orange","pale gray","dark gray and white","cream","light cream","dark cream","cream tabby","golden tabby","mottled light brown","mottled brown","reddish-brown","speckled brown","speckled white","speckled ginger","russet colored","night-black","white and ginger","smoky black","brown and cream","pale tabby","creamy brown","red","red tabby","orange tabby","blue-gray","blue-gray tabby","bluish-gray","blue","pink","gray and white","gray and white tabby","bright ginger","red and white","black and brown","creamy","white","white","white","white","black","black","brown","brown","brown","brown"];

    dead_cat_color = "";
    dead_cat_color = dead_possible_colors[Math.floor(Math.random()*dead_possible_colors.length)];

    var new_dead_cat = {"name":dead_name, "allegience":dead_allegience, "likely_mate_index":dead_likely_mate_index, "color":dead_cat_color};
    dead_mothers.cats.push(new_dead_cat);

    //fathers
    var dead_rank = "warrior";
    if (Math.random() > 0.9 && rc_leader == false) { dead_rank = "leader"; rc_leader = true; }
    var new_relative_name = generateRandomCatName(dead_rank);

    var dead_name = new_relative_name;
    var dead_allegience = "RiverClan"
    var dead_likely_mate_index = Math.floor(Math.random()*dead_number_of_each_gender_per_clan);

    var dead_possible_colors = ["pale ginger","dark tortoiseshell","white","light gray","brown","ginger","dark brown tabby","light tortoiseshell","gray","silver","light brown tabby","brown tabby","pure white","dusky brown","dark brown","light brown","golden brown","golden","light golden","silvery gray","black and white","black","dark black","black tabby","dark black tabby","dark orange","orange","light orange","pale gray","dark gray and white","cream","light cream","dark cream","cream tabby","golden tabby","mottled light brown","mottled brown","reddish-brown","speckled brown","speckled white","speckled ginger","russet colored","night-black","white and ginger","smoky black","brown and cream","pale tabby","creamy brown","red","red tabby","orange tabby","blue-gray","blue-gray tabby","bluish-gray","blue","pink","gray and white","gray and white tabby","bright ginger","red and white","black and brown","creamy","white","white","white","white","black","black","brown","brown","brown","brown"];

    dead_cat_color = "";
    dead_cat_color = dead_possible_colors[Math.floor(Math.random()*dead_possible_colors.length)];

    var new_dead_cat = {"name":dead_name, "allegience":dead_allegience, "likely_mate_index":dead_likely_mate_index, "color":dead_cat_color};
    dead_fathers.cats.push(new_dead_cat);
  }

  //shadowclan
  var sc_leader = false;
  for (var i = 0; i < dead_number_of_each_gender_per_clan; i++)
  {
    //mothers
    var dead_rank = "warrior";
    if (Math.random() > 0.9 && sc_leader == false) { dead_rank = "leader"; sc_leader = true; }
    var new_relative_name = generateRandomCatName(dead_rank);

    var dead_name = new_relative_name;
    var dead_allegience = "ShadowClan"
    var dead_likely_mate_index = Math.floor(Math.random()*dead_number_of_each_gender_per_clan);

    var dead_possible_colors = ["pale ginger","dark tortoiseshell","white","light gray","brown","ginger","dark brown tabby","light tortoiseshell","gray","silver","light brown tabby","brown tabby","pure white","dusky brown","dark brown","light brown","golden brown","golden","light golden","silvery gray","black and white","black","dark black","black tabby","dark black tabby","dark orange","orange","light orange","pale gray","dark gray and white","cream","light cream","dark cream","cream tabby","golden tabby","mottled light brown","mottled brown","reddish-brown","speckled brown","speckled white","speckled ginger","russet colored","night-black","white and ginger","smoky black","brown and cream","pale tabby","creamy brown","red","red tabby","orange tabby","blue-gray","blue-gray tabby","bluish-gray","blue","pink","gray and white","gray and white tabby","bright ginger","red and white","black and brown","creamy","white","white","white","white","black","black","brown","brown","brown","brown"];

    dead_cat_color = "";
    dead_cat_color = dead_possible_colors[Math.floor(Math.random()*dead_possible_colors.length)];

    var new_dead_cat = {"name":dead_name, "allegience":dead_allegience, "likely_mate_index":dead_likely_mate_index, "color":dead_cat_color};
    dead_mothers.cats.push(new_dead_cat);

    //fathers
    var dead_rank = "warrior";
    if (Math.random() > 0.9 && sc_leader == false) { dead_rank = "leader"; sc_leader = true; }
    var new_relative_name = generateRandomCatName(dead_rank);

    var dead_name = new_relative_name;
    var dead_allegience = "ShadowClan"
    var dead_likely_mate_index = Math.floor(Math.random()*dead_number_of_each_gender_per_clan);

    var dead_possible_colors = ["pale ginger","dark tortoiseshell","white","light gray","brown","ginger","dark brown tabby","light tortoiseshell","gray","silver","light brown tabby","brown tabby","pure white","dusky brown","dark brown","light brown","golden brown","golden","light golden","silvery gray","black and white","black","dark black","black tabby","dark black tabby","dark orange","orange","light orange","pale gray","dark gray and white","cream","light cream","dark cream","cream tabby","golden tabby","mottled light brown","mottled brown","reddish-brown","speckled brown","speckled white","speckled ginger","russet colored","night-black","white and ginger","smoky black","brown and cream","pale tabby","creamy brown","red","red tabby","orange tabby","blue-gray","blue-gray tabby","bluish-gray","blue","pink","gray and white","gray and white tabby","bright ginger","red and white","black and brown","creamy","white","white","white","white","black","black","brown","brown","brown","brown"];

    dead_cat_color = "";
    dead_cat_color = dead_possible_colors[Math.floor(Math.random()*dead_possible_colors.length)];

    var new_dead_cat = {"name":dead_name, "allegience":dead_allegience, "likely_mate_index":dead_likely_mate_index, "color":dead_cat_color};
    dead_fathers.cats.push(new_dead_cat);
  }

  //windclan
  var wc_leader = false;
  for (var i = 0; i < dead_number_of_each_gender_per_clan; i++)
  {
    //mothers
    var dead_rank = "warrior";
    if (Math.random() > 0.9 && wc_leader == false) { dead_rank = "leader"; wc_leader = true; }
    var new_relative_name = generateRandomCatName(dead_rank);

    var dead_name = new_relative_name;
    var dead_allegience = "WindClan"
    var dead_likely_mate_index = Math.floor(Math.random()*dead_number_of_each_gender_per_clan);

    var dead_possible_colors = ["pale ginger","dark tortoiseshell","white","light gray","brown","ginger","dark brown tabby","light tortoiseshell","gray","silver","light brown tabby","brown tabby","pure white","dusky brown","dark brown","light brown","golden brown","golden","light golden","silvery gray","black and white","black","dark black","black tabby","dark black tabby","dark orange","orange","light orange","pale gray","dark gray and white","cream","light cream","dark cream","cream tabby","golden tabby","mottled light brown","mottled brown","reddish-brown","speckled brown","speckled white","speckled ginger","russet colored","night-black","white and ginger","smoky black","brown and cream","pale tabby","creamy brown","red","red tabby","orange tabby","blue-gray","blue-gray tabby","bluish-gray","blue","pink","gray and white","gray and white tabby","bright ginger","red and white","black and brown","creamy","white","white","white","white","black","black","brown","brown","brown","brown"];

    dead_cat_color = "";
    dead_cat_color = dead_possible_colors[Math.floor(Math.random()*dead_possible_colors.length)];

    var new_dead_cat = {"name":dead_name, "allegience":dead_allegience, "likely_mate_index":dead_likely_mate_index, "color":dead_cat_color};
    dead_mothers.cats.push(new_dead_cat);

    //fathers
    var dead_rank = "warrior";
    if (Math.random() > 0.9 && wc_leader == false) { dead_rank = "leader"; wc_leader = true; }
    var new_relative_name = generateRandomCatName(dead_rank);

    var dead_name = new_relative_name;
    var dead_allegience = "WindClan"
    var dead_likely_mate_index = Math.floor(Math.random()*dead_number_of_each_gender_per_clan);

    var dead_possible_colors = ["pale ginger","dark tortoiseshell","white","light gray","brown","ginger","dark brown tabby","light tortoiseshell","gray","silver","light brown tabby","brown tabby","pure white","dusky brown","dark brown","light brown","golden brown","golden","light golden","silvery gray","black and white","black","dark black","black tabby","dark black tabby","dark orange","orange","light orange","pale gray","dark gray and white","cream","light cream","dark cream","cream tabby","golden tabby","mottled light brown","mottled brown","reddish-brown","speckled brown","speckled white","speckled ginger","russet colored","night-black","white and ginger","smoky black","brown and cream","pale tabby","creamy brown","red","red tabby","orange tabby","blue-gray","blue-gray tabby","bluish-gray","blue","pink","gray and white","gray and white tabby","bright ginger","red and white","black and brown","creamy","white","white","white","white","black","black","brown","brown","brown","brown"];

    dead_cat_color = "";
    dead_cat_color = dead_possible_colors[Math.floor(Math.random()*dead_possible_colors.length)];

    var new_dead_cat = {"name":dead_name, "allegience":dead_allegience, "likely_mate_index":dead_likely_mate_index, "color":dead_cat_color};
    dead_fathers.cats.push(new_dead_cat);
  }

  //loners
  for (var i = 0; i < dead_number_of_each_gender_per_clan; i++)
  {
    //mothers
    var dead_rank = "loner";
    var new_relative_name = generateRandomCatName(dead_rank);

    var dead_name = new_relative_name;
    var dead_allegience = "Loner"
    var dead_likely_mate_index = Math.floor(Math.random()*dead_number_of_each_gender_per_clan);

    var dead_possible_colors = ["pale ginger","dark tortoiseshell","white","light gray","brown","ginger","dark brown tabby","light tortoiseshell","gray","silver","light brown tabby","brown tabby","pure white","dusky brown","dark brown","light brown","golden brown","golden","light golden","silvery gray","black and white","black","dark black","black tabby","dark black tabby","dark orange","orange","light orange","pale gray","dark gray and white","cream","light cream","dark cream","cream tabby","golden tabby","mottled light brown","mottled brown","reddish-brown","speckled brown","speckled white","speckled ginger","russet colored","night-black","white and ginger","smoky black","brown and cream","pale tabby","creamy brown","red","red tabby","orange tabby","blue-gray","blue-gray tabby","bluish-gray","blue","pink","gray and white","gray and white tabby","bright ginger","red and white","black and brown","creamy","white","white","white","white","black","black","brown","brown","brown","brown"];

    dead_cat_color = "";
    dead_cat_color = dead_possible_colors[Math.floor(Math.random()*dead_possible_colors.length)];

    var new_dead_cat = {"name":dead_name, "allegience":dead_allegience, "likely_mate_index":dead_likely_mate_index, "color":dead_cat_color};
    dead_mothers.cats.push(new_dead_cat);

    //fathers
    var dead_rank = "loner";
    var new_relative_name = generateRandomCatName(dead_rank);

    var dead_name = new_relative_name;
    var dead_allegience = "Loner"
    var dead_likely_mate_index = Math.floor(Math.random()*dead_number_of_each_gender_per_clan);

    var dead_possible_colors = ["pale ginger","dark tortoiseshell","white","light gray","brown","ginger","dark brown tabby","light tortoiseshell","gray","silver","light brown tabby","brown tabby","pure white","dusky brown","dark brown","light brown","golden brown","golden","light golden","silvery gray","black and white","black","dark black","black tabby","dark black tabby","dark orange","orange","light orange","pale gray","dark gray and white","cream","light cream","dark cream","cream tabby","golden tabby","mottled light brown","mottled brown","reddish-brown","speckled brown","speckled white","speckled ginger","russet colored","night-black","white and ginger","smoky black","brown and cream","pale tabby","creamy brown","red","red tabby","orange tabby","blue-gray","blue-gray tabby","bluish-gray","blue","pink","gray and white","gray and white tabby","bright ginger","red and white","black and brown","creamy","white","white","white","white","black","black","brown","brown","brown","brown"];

    dead_cat_color = "";
    dead_cat_color = dead_possible_colors[Math.floor(Math.random()*dead_possible_colors.length)];

    var new_dead_cat = {"name":dead_name, "allegience":dead_allegience, "likely_mate_index":dead_likely_mate_index, "color":dead_cat_color};
    dead_fathers.cats.push(new_dead_cat);
  }

}

var promoteQueens = function() {
  var all_cats_array = catsJSON.cats;
  for (var i = 0; i < all_cats_array.length; i++)
  {
    var local_cat = all_cats_array[i];
    if (local_cat.mother_type == "living")
    {
      if (local_cat.mother == "Unknown" || local_cat.mother == -1)
      {
        //do nothing
      }
      else {
        if (local_cat.mother > catsJSON.cats.length) { //do nothing
        }
        else {
          if (all_cats_array[local_cat.mother].allegience == "Loner")
          {
            //do nothing
          }
          else {
            if (all_cats_array[local_cat.mother].rank !== "leader" && all_cats_array[local_cat.mother].rank !== "deputy" && all_cats_array[local_cat.mother].rank !== "medicine cat")
            {
              all_cats_array[local_cat.mother].rank = "queen";
            }
          }
        }


      }
    }
  }
}

var assignMentors = function() {
  var all_cats_array = catsJSON.cats;

  for (var i = 0; i < all_cats_array.length; i++)
  {
    var local_cat = all_cats_array[i];
    var leader_index = -1;
    if (local_cat.rank == "apprentice")
    {
      //needs a mentor!
      var available_mentors_list = [];
      for (var j = 0; j < all_cats_array.length; j++)
      {
        var local_mentor = all_cats_array[j];
        if (local_mentor.allegience == local_cat.allegience && local_mentor.apprentice == -1)
        {
          if (local_mentor.rank == "warrior" || local_mentor.rank == "medicine cat" || local_mentor.rank == "deputy")
          {
              available_mentors_list.push(j);

          }

          if (local_mentor.rank == "leader")
          {
            leader_index = j;
          }
        }

      }

      if (available_mentors_list.length == 0) {
        if (leader_index >= 0 && all_cats_array[leader_index].apprentice == -1) { local_cat.mentor = leader_index; all_cats_array[leader_index].apprentice = i; }
        else {
          local_cat.mentor = leader_index;
        }
      }
      else {
        var random_index = Math.floor(Math.random()*available_mentors_list.length);
        local_cat.mentor = available_mentors_list[random_index];
        all_cats_array[local_cat.mentor].apprentice = i;
     }
    }
  }
}

var getNameByIndex = function(index) {
  var catsArray = catsJSON.cats;
  return catsArray[index].name;
}

var getPhotoByIndex = function(index) {
  var catsArray = catsJSON.cats;
  return catsArray[index].picture;
}

var getCatColorClassByIndex = function(index) {
  var catsArray = catsJSON.cats;

  var local_cat_color = catsArray[index].name_color;
  local_cat_color = local_cat_color.replace(/_/g, " ");

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

  console.log("error finding color!");
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
  else if (color_name == "reddish-brown") { return "reddish-brown"; }
  else if (color_name == "russet colored" || color_name == "red" || color_name == "red tabby" || color_name == "red and white") { return "red"; }
  else if (color_name == "blue-gray" || color_name == "blue-gray tabby" || color_name == "bluish-gray" || color_name == "blue") { return "blue"; }
  else if (color_name == "pink") { return "pink"; }
}

var getDeadFatherColorClassByIndex = function(index) {
  var catsArray = dead_fathers.cats;

  var local_cat_color = catsArray[index].color;

  if (local_cat_color == "pale ginger" || local_cat_color == "light orange" || local_cat_color == "bright ginger") { return "color_light_orange"; }
  else if (local_cat_color == "ginger" || local_cat_color == "orange" || local_cat_color == "speckled ginger" || local_cat_color == "orange tabby") { return "color_orange"; }
  else if (local_cat_color == "dark orange" || local_cat_color == "white and ginger") { return "color_dark_orange"; }
  else if (local_cat_color == "white" || local_cat_color == "pure white" || local_cat_color == "speckled white") { return "color_white"; }
  else if (local_cat_color == "light gray" || local_cat_color == "pale gray" || local_cat_color == "gray and white" || local_cat_color == "gray and white tabby" || local_cat_color == "silver" || local_cat_color == "silvery gray" || local_cat_color == "gray") { return "color_gray"; }
  else if (local_cat_color == "dark gray and white") { return "color_dark_gray"; }
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

  return "white"; //default case
}

var getDeadMotherColorClassByIndex = function(index) {
  var catsArray = dead_mothers.cats;

  var local_cat_color = catsArray[index].color;

  if (local_cat_color == "pale ginger" || local_cat_color == "light orange" || local_cat_color == "bright ginger") { return "color_light_orange"; }
  else if (local_cat_color == "ginger" || local_cat_color == "orange" || local_cat_color == "speckled ginger" || local_cat_color == "orange tabby") { return "color_orange"; }
  else if (local_cat_color == "dark orange" || local_cat_color == "white and ginger") { return "color_dark_orange"; }
  else if (local_cat_color == "white" || local_cat_color == "pure white" || local_cat_color == "speckled white") { return "color_white"; }
  else if (local_cat_color == "light gray" || local_cat_color == "pale gray" || local_cat_color == "gray and white" || local_cat_color == "gray and white tabby" || local_cat_color == "silver" || local_cat_color == "silvery gray" || local_cat_color == "gray") { return "color_gray"; }
  else if (local_cat_color == "dark gray and white") { return "color_dark_gray"; }
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

  return "white"; //default case
}

var normalizeAges = function() {
  var all_cats_array = catsJSON.cats;

  for (var i = 0; i < all_cats_array.length; i++)
  {
    var local_cat = all_cats_array[i];

    var normalization_max = Math.floor(Math.random()*2)+4;
    for (var j = 0; j < all_cats_array.length; j++)
    {
      moons_difference = 10;

      if (all_cats_array[j].moons > 40 && local_cat.moons > 40) { moons_difference = 30; }

      if (all_cats_array[j].moons !== local_cat.moons && Math.abs(all_cats_array[j].moons-local_cat.moons) < moons_difference)
      {
        if (all_cats_array[j].mother == local_cat.mother && all_cats_array[j].father == local_cat.father)
        {
          var can_continue = true;

          if (all_cats_array[j].rank == "kitten" && local_cat.rank == "apprentice" || all_cats_array[j].rank == "apprentice" && local_cat.rank == "kitten")
          {
            can_continue = false;
          }

          if (can_continue && getNumberOfSharedBirths(local_cat.moons) <= normalization_max)
          {
            //found one!

            if ((all_cats_array[j].rank == "apprentice" || all_cats_array[j].rank == "kitten") && local_cat.moon >= apprentice_moons)
            {
              //do nothing
            }
            else {
              if (all_cats_array[j].rank == "apprentice" && local_cat.moons >= apprentice_moons) { /* do nothing */ }
              else if (all_cats_array[j].rank == "kitten" && local_cat.moons >= kitten_moons) { /* do nothing */ }
              else if (local_cat.rank == "apprentice" && all_cats_array[j].moons >= apprentice_moons) { /* do nothing */ }
              else if (local_cat.rank == "kitten" && all_cats_array[j].moons >= kitten_moons) { /* do nothing */ }
              else {
                all_cats_array[j].moons = local_cat.moons;
              }
            }
          }
        }
      }
    }
  }

  //make sure parents are still older than Children
  var made_changes = true;

  while (made_changes)
  {
    made_changes = false;

    for (var i = 0; i < all_cats_array.length; i++)
    {
      var local_child = all_cats_array[i];

      if (local_child.mother_type == "living")
      {
        if (local_child.mother >= 0 && local_child.mother !== "Unknown")
        {
          //child has a living mother that is not unknown
          var parent_index = local_child.mother;
          var local_parent = all_cats_array[parent_index];

          if (local_child.moons+12 > local_parent.moons)
          {
            local_parent.moons = local_child.moons+15;
            made_changes = true;

            if (local_parent.moons >= max_moons)
            {
              local_parent.moons = max_moons;
              made_changes = false;
            }
          }
        }
      }

      if (local_child.father_type == "living")
      {
        if (local_child.father >= 0 && local_child.father !== "Unknown")
        {
          //child has a living father that is not unknown
          var parent_index = local_child.father;
          var local_parent = all_cats_array[parent_index];

          if (local_child.moons+12 > local_parent.moons)
          {
            local_parent.moons = local_child.moons+15;
            made_changes = true;

            if (local_parent.moons >= max_moons)
            {
              local_parent.moons = max_moons;
              made_changes = false;
            }
          }
        }
      }
    }
  }
}

var getNumberOfSharedBirths = function(moons) {
  var number_of_cats = 0;

  for (var i = 0; i < catsJSON.cats.length; i++)
  {
    if (catsJSON.cats[i].moons == moons)
    {
      number_of_cats++;
    }
  }

  return number_of_cats;
}

var applyColorGenetics = function() {
  var made_changes = true;

  while (made_changes)
  {
    made_changes = false;
    for (var i = 0; i < catsJSON.cats.length; i++)
    {
      var local_cat = catsJSON.cats[i];
      var local_cat_color_category = getCatColorClassByIndex(i);

      var local_father_color_category = "any";
      var local_mother_color_category = "any";

      var local_father = local_cat.father;
      if (local_father !== -1 && local_father !== "Unknown" && local_father >= 0)
      {
        if (local_cat.father_type == "living")
        {
          //living relative
          var local_father_color_category = getCatColorClassByIndex(local_cat.father);
        }
        else if (local_cat.father_type == "dead")
        {
          //dead relative
          var local_father_color_category = getDeadFatherColorClassByIndex(local_cat.father);
        }
      }

      var local_mother = local_cat.mother;
      if (local_mother !== -1 && local_mother !== "Unknown" && local_mother >= 0)
      {
        if (local_cat.mother_type == "living")
        {
          //living relative
          var local_mother_color_category = getCatColorClassByIndex(local_cat.mother);
        }
        else if (local_cat.mother_type == "dead")
        {
          //dead relative
          var local_mother_color_category = getDeadMotherColorClassByIndex(local_cat.mother);
        }
      }

      //now we have a local_father_color_category and a local_mother_color_category to compare to my local_cat_color_category

      if (local_cat_color_category == local_mother_color_category || local_cat_color_category == local_father_color_category || local_mother_color_category == "any" || local_father_color_category == "any")
      {
        //do nothing! Done here.
      }
      else
      {
        //need a change of color most likely
        if (Math.random() > 0.5)
        {
          //use mother's color category
          var new_color_category = "color_white";

          var possible_color_categories = ["color_white"];

          if (local_mother_color_category == "color_light_orange") { possible_color_categories = ["color_light_orange", "color_orange", "color_dark_orange", "color_red", "color_pink"]; }
          else if (local_mother_color_category == "color_orange") { possible_color_categories = ["color_light_orange", "color_orange", "color_dark_orange", "color_red", "color_pink"]; }
          else if (local_mother_color_category == "color_dark_orange") { possible_color_categories = ["color_light_orange", "color_orange", "color_dark_orange", "color_red", "color_pink"]; }
          else if (local_mother_color_category == "color_white") { possible_color_categories = ["color_white", "color_gray"]; }
          else if (local_mother_color_category == "color_gray") { possible_color_categories = ["color_white", "color_gray", "color_dark_gray", "color_blue"]; }
          else if (local_mother_color_category == "color_dark_gray") { possible_color_categories = ["color_black", "color_gray", "color_dark_gray", "color_blue"]; }
          else if (local_mother_color_category == "color_black") { possible_color_categories = ["color_black", "color_dark_brown", "color_dark_gray"]; }
          else if (local_mother_color_category == "color_golden_brown") { possible_color_categories = ["color_golden_brown", "color_brown", "color_golden"]; }
          else if (local_mother_color_category == "color_light_brown") { possible_color_categories = ["color_golden_brown", "color_light_brown", "color_brown"]; }
          else if (local_mother_color_category == "color_brown") { possible_color_categories = ["color_dark_brown", "color_light_brown", "color_brown"]; }
          else if (local_mother_color_category == "color_dark_brown") { possible_color_categories = ["color_dark_brown", "color_reddish_brown", "color_brown"]; }
          else if (local_mother_color_category == "color_cream") { possible_color_categories = ["color_cream", "color_dark_cream", "color_light_brown", "color_light_orange", "color_pink"]; }
          else if (local_mother_color_category == "color_dark_cream") { possible_color_categories = ["color_cream", "color_dark_cream", "color_dark_brown", "color_dark_orange"]; }
          else if (local_mother_color_category == "color_golden") { possible_color_categories = ["color_golden", "color_golden_brown", "color_dark_cream"]; }
          else if (local_mother_color_category == "color_reddish_brown") { possible_color_categories = ["color_reddish_brown", "color_red", "color_brown"]; }
          else if (local_mother_color_category == "color_red") { possible_color_categories = ["color_reddish_brown", "color_red", "color_pink", "color_orange"]; }
          else if (local_mother_color_category == "color_blue") { possible_color_categories = ["color_blue", "color_gray", "color_dark_gray"]; }
          else if (local_mother_color_category == "color_pink") { possible_color_categories = ["color_pink", "color_red", "color_light_orange"]; }

          if (Math.random() > 0.5) { new_color_category = local_mother_color_category; }
          else { new_color_category = possible_color_categories[Math.floor(Math.random()*possible_color_categories.length)]; }

          if (new_color_category !== local_cat_color_category)
          {
            local_cat.color = getNewColorFromCategory(new_color_category);
            local_cat.name_color = local_cat.color;
            made_changes = true;
          }
        }
        else
        {
          //use father's color category
          var new_color_category = "color_white";

          var possible_color_categories = ["color_white"];

          if (local_father_color_category == "color_light_orange") { possible_color_categories = ["color_light_orange", "color_orange", "color_dark_orange", "color_red", "color_pink"]; }
          else if (local_father_color_category == "color_orange") { possible_color_categories = ["color_light_orange", "color_orange", "color_dark_orange", "color_red", "color_pink"]; }
          else if (local_father_color_category == "color_dark_orange") { possible_color_categories = ["color_light_orange", "color_orange", "color_dark_orange", "color_red", "color_pink"]; }
          else if (local_father_color_category == "color_white") { possible_color_categories = ["color_white", "color_gray"]; }
          else if (local_father_color_category == "color_gray") { possible_color_categories = ["color_white", "color_gray", "color_dark_gray", "color_blue"]; }
          else if (local_father_color_category == "color_dark_gray") { possible_color_categories = ["color_black", "color_gray", "color_dark_gray", "color_blue"]; }
          else if (local_father_color_category == "color_black") { possible_color_categories = ["color_black", "color_dark_brown", "color_dark_gray"]; }
          else if (local_father_color_category == "color_golden_brown") { possible_color_categories = ["color_golden_brown", "color_brown", "color_golden"]; }
          else if (local_father_color_category == "color_light_brown") { possible_color_categories = ["color_golden_brown", "color_light_brown", "color_brown"]; }
          else if (local_father_color_category == "color_brown") { possible_color_categories = ["color_dark_brown", "color_light_brown", "color_brown"]; }
          else if (local_father_color_category == "color_dark_brown") { possible_color_categories = ["color_dark_brown", "color_reddish_brown", "color_brown"]; }
          else if (local_father_color_category == "color_cream") { possible_color_categories = ["color_cream", "color_dark_cream", "color_light_brown", "color_light_orange", "color_pink"]; }
          else if (local_father_color_category == "color_dark_cream") { possible_color_categories = ["color_cream", "color_dark_cream", "color_dark_brown", "color_dark_orange"]; }
          else if (local_father_color_category == "color_golden") { possible_color_categories = ["color_golden", "color_golden_brown", "color_dark_cream"]; }
          else if (local_father_color_category == "color_reddish_brown") { possible_color_categories = ["color_reddish_brown", "color_red", "color_brown"]; }
          else if (local_father_color_category == "color_red") { possible_color_categories = ["color_reddish_brown", "color_red", "color_pink", "color_orange"]; }
          else if (local_father_color_category == "color_blue") { possible_color_categories = ["color_blue", "color_gray", "color_dark_gray"]; }
          else if (local_father_color_category == "color_pink") { possible_color_categories = ["color_pink", "color_red", "color_light_orange"]; }

          if (Math.random() > 0.5) { new_color_category = local_father_color_category; }
          else { new_color_category = possible_color_categories[Math.floor(Math.random()*possible_color_categories.length)]; }

          if (new_color_category !== local_cat_color_category)
          {
            local_cat.color = getNewColorFromCategory(new_color_category);
            local_cat.name_color = local_cat.color;

            made_changes = true;
          }
        }
      }
    }
  }
}

var getNewColorFromCategory = function(category) {
  var possible_colors = ["white"];


  if (category == "color_light_orange") { possible_colors = ["pale ginger", "light orange", "bright ginger"]; }
  else if (category == "color_orange") { possible_colors = ["ginger", "orange", "speckled ginger", "orange tabby"]; }
  else if (category == "color_dark_orange") { possible_colors = ["dark orange", "white and ginger"]; }
  else if (category == "color_white") { possible_colors = ["white", "pure white", "speckled white"]; }
  else if (category == "color_gray") { possible_colors = ["light gray", "pale gray", "gray and white", "gray and white tabby", "silver", "silvery gray", "gray"]; }
  else if (category == "color_dark_gray") { possible_colors = ["dark gray and white"]; }
  else if (category == "color_golden_brown") { possible_colors = ["golden brown"]; }
  else if (category == "color_golden") { possible_colors = ["golden", "golden tabby"]; }
  else if (category == "color_light_brown") { possible_colors = ["light brown tabby", "light tortoiseshell", "light brown", "mottled light brown"]; }
  else if (category == "color_brown") { possible_colors = ["brown", "brown tabby", "mottled brown", "speckled brown", "creamy brown"]; }
  else if (category == "color_dark_brown") { possible_colors = ["dark brown tabby", "dusky brown", "dark brown", "dark tortoiseshell"]; }
  else if (category == "color_cream") { possible_colors = ["light golden", "cream", "light cream","cream tabby", "brown and cream", "pale tabby","creamy"]; }
  else if (category == "color_dark_cream") { possible_colors = ["dark cream"]; }
  else if (category == "color_black") { possible_colors = ["night-black", "black and white", "black","dark black","black tabby","dark black tabby","smoky black", "black and brown"]; }
  else if (category == "color_reddish_brown") { possible_colors = ["reddish-brown"]; }
  else if (category == "color_red") { possible_colors = ["russet colored", "red", "red tabby", "red and white"]; }
  else if (category == "color_blue") { possible_colors = ["blue-gray", "blue-gray tabby", "bluish-gray", "blue"]; }
  else if (category == "color_pink") { possible_colors = ["pink"]; }

  var new_color_selection = possible_colors[Math.floor(Math.random()*possible_colors.length)];

  return new_color_selection;
}

var assignCatPhotos = function() {
  for (var i = 0; i < catsJSON.cats.length; i++)
  {
    var local_cat = catsJSON.cats[i];
    if (local_cat.picture == "color_default.jpg")
    {
      //reassign a new photo to this cat.
      var color_category_name = getCatColorClassByIndex(i);

      local_cat.picture = color_category_name+(Math.floor(Math.random()*10)+1)+".jpg";
    }
  }
}

var intervalVar = null;

var total_number_of_cats = 60;

var changeNumberOfCats = function() {
  if ($("#number_of_cats_to_generate").val() < 30)
  {
    $("#number_of_cats_to_generate").val(30);
  }
  if ($("#number_of_cats_to_generate").val() > 100)
  {
    $("#number_of_cats_to_generate").val(100);
  }

  total_number_of_cats = $("#number_of_cats_to_generate").val();
}

var saveToServer = function () {
  window.clearInterval(intervalVar);
  $("#save_spinner").show();

  hideAdvancedOptions();

  $("#save_message").text("");

  $("#importantLinks").hide();
  $("#savingDiv").show();

  $.ajax({
    type: "POST",
    url: "./save.php",
    data: {
      "catsJSON": JSON.stringify(catsJSON),
      "dead_fathers": JSON.stringify(dead_fathers),
      "dead_mothers": JSON.stringify(dead_mothers),
      "guid": editGuid.toString()
    },
    success: function(data) {
      $("#save_spinner").hide();
      $("#save_message").text("Save Successful!");

      shareGuid = data.share_guid;

      $("#read_only_message").hide();
      $("#saveButton").attr('value',"Save");
      $("#toggleEditButton").show();

      if (editMode)
      {
        toggleEditMode();
      }

      intervalVar = window.setInterval(hideSuccessMessage,5000);

      window.history.replaceState(null, null, "?guid="+editGuid);

      pushToRecentlyVisited();

      $("#edit_link_url").text("http://"+window.location.hostname+window.location.pathname+"?guid="+editGuid);
      $("#shareable_link_url").text("http://"+window.location.hostname+window.location.pathname+"?shareGuid="+shareGuid);

      $("#shareable_link_a").attr('href', "http://"+window.location.hostname+window.location.pathname+"?shareGuid="+shareGuid);
      $("#edit_link_a").attr('href',"http://"+window.location.hostname+window.location.pathname+"?guid="+editGuid);

      $("#importantLinks").show();
      $("#savingDiv").show();

      pushJSONtoAllegiencesHTML();
    },
    error: function(data) {
      console.log("error in getDataFromServer()! Response: "+data);
    },
    dataType: 'json'
  });
}

var getDataFromServer = function(guid, getType) {
  $("#page_loading_modal").show();
  $("body").css("overflow-y", "hidden");

  can_push_to_html = false;

  var post_data = {
    "guid": editGuid,
    "share_guid": shareGuid
  };

  if (getType == "edit") {
    post_data = {
      "guid": editGuid
    };
  }
  else if (getType == "share") {
    post_data = {
      "share_guid": shareGuid
    }
  }

  $.ajax({
    type: "GET",
    url: "./get_cats_data.php",
    data: post_data,
    success: function(data) {
      catsJSON = JSON.parse(data.catsJSON);
      dead_fathers = JSON.parse(data.dead_fathers);
      dead_mothers = JSON.parse(data.dead_mothers);
      shareGuid = data.share_guid;
      listName = data.title;

      can_push_to_html = true;

      saveGame();

      pushJSONtoAllegiencesHTML();

      if (getType == "edit")
      {
        pushToRecentlyVisited();
      }

      if (getType == "edit")
      {
        window.history.replaceState(null, null, "?guid="+editGuid);

        $("#edit_link_url").text("http://"+window.location.hostname+window.location.pathname+"?guid="+editGuid);
        $("#shareable_link_url").text("http://"+window.location.hostname+window.location.pathname+"?shareGuid="+shareGuid);

        $("#shareable_link_a").attr('href', "http://"+window.location.hostname+window.location.pathname+"?shareGuid="+shareGuid);
        $("#edit_link_a").attr('href',"http://"+window.location.hostname+window.location.pathname+"?guid="+editGuid);

        $("#importantLinks").show();
        $("#savingDiv").show();
      }
      else {
        window.history.replaceState(null, null, "?shareGuid="+shareGuid);
      }

      var intervalLoad = setInterval(function() {clearInterval(intervalLoad); $("#page_loading_modal").fadeOut(300); $("body").css("overflow-y", "scroll")}, 1000);

      if (getType == "share")
      {
        catsJSON.title = catsJSON.title + " - Copy";
      }
    },
    error: function(data) {
      can_push_to_html = true;
      console.log("error in getDataFromServer()! Response: "+data);

      $("#loading_modal_error_message").show();
      $("#loading_modal_spinner").hide();
    },
    dataType: "json"
  });
}

var getTitleFromServer = function(guid, tag_value) {
  var post_data = {
    "guid": guid,
  };

  $.ajax({
    type: "GET",
    url: "./get_cats_data.php",
    data: post_data,
    success: function(data) {
      var localJSON = JSON.parse(data.catsJSON);

      $("#guid_"+guid).text(localJSON.title);

      $(".pop_in_"+tag_value).show();
      return localJSON.title;
    },
    error: function(data) {
      can_push_to_html = true;
      console.log("error in getTitleFromServer()! Response: "+data);
    },
    dataType: "json"
  });
}

var hideSuccessMessage = function() {
  window.clearInterval(intervalVar);

  $("#save_message").text("");
}

var copyEditUrl = function() {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($("#edit_link_a").attr('href')).select();
  document.execCommand("copy");
  $temp.remove();
}

var copyShareableUrl = function() {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($("#shareable_link_a").attr('href')).select();
  document.execCommand("copy");
  $temp.remove();
}

var emptyCatsList = function() {
  catsJSON = JSON.parse(JSON.stringify(startCatsJSON));
  dead_fathers = {"cats":[]};
  dead_mothers = {"cats":[]};
  pushJSONtoAllegiencesHTML();

  saveGame();
}

var pushToRecentlyVisited = function() {
  if (editGuid == null) {
    return false;
  }
  else {
    //editGuid is not null
    var recently_visited_array = JSON.parse(localStorage.getItem('recentlyVisited'));

    if (recently_visited_array == null) { recently_visited_array = []; }

    //check for dupes
    for (var i = 0; i < recently_visited_array.length; i++)
    {
      if (recently_visited_array[i] == editGuid)
      {
        recently_visited_array.splice(i,1);
        i = 0;
      }
    }

    //remove any entries larger than 8
    for (var i = 0; i < recently_visited_array.length; i++)
    {
      if (i >= 7) //max 8 items
      {
        recently_visited_array.splice(i,1);
        i = 0;
      }
    }

    //push editGuid into recently_visited_array
    recently_visited_array.unshift(editGuid);

    //commit recently_visited_array to localStorage
    localStorage.setItem('recentlyVisited',JSON.stringify(recently_visited_array));
  }
}

var toggleEditMode = function() {
  if (!editMode)
  {
    $("#importantLinks").hide();
    $("#savingDiv").hide();

    $("#toggleEditButton").hide();

    $(".editShow").show();
    $(".editHide").hide();

    $("#list_name_input").val($(".list_name").text());
    $("#clan_one_name_input").val($("#clan_one_name").text());
    $("#clan_two_name_input").val($("#clan_two_name").text());
    $("#clan_three_name_input").val($("#clan_three_name").text());
    $("#clan_four_name_input").val($("#clan_four_name").text());
    $("#clan_five_name_input").val($("#clan_five_name").text());

    $("#clan_one_symbol_input").val(catsJSON.clan_one_icon);
    $("#clan_two_symbol_input").val(catsJSON.clan_two_icon);
    $("#clan_three_symbol_input").val(catsJSON.clan_three_icon);
    $("#clan_four_symbol_input").val(catsJSON.clan_four_icon);
    $("#clan_five_symbol_input").val(catsJSON.clan_five_icon);
  }
  else {
    $("#toggleEditButton").val("Edit Mode");
    $(".editShow").hide();
    $(".editHide").show();

    catsJSON.title = $("#list_name_input").val();

    catsJSON.clan_one_name = $("#clan_one_name_input").val();
    catsJSON.clan_two_name = $("#clan_two_name_input").val();
    catsJSON.clan_three_name = $("#clan_three_name_input").val();
    catsJSON.clan_four_name = $("#clan_four_name_input").val();
    catsJSON.clan_five_name = $("#clan_five_name_input").val();

    catsJSON.clan_one_icon = $("#clan_one_symbol_input").val();
    catsJSON.clan_two_icon = $("#clan_two_symbol_input").val();
    catsJSON.clan_three_icon = $("#clan_three_symbol_input").val();
    catsJSON.clan_four_icon = $("#clan_four_symbol_input").val();
    catsJSON.clan_five_icon = $("#clan_five_symbol_input").val();


    if (catsJSON.title == '')
    {
      catsJSON.title = "No List Name";
      $("#list_name_input").val("No List Name");
      $(".list_name").text("No List Name");
    }

    if (catsJSON.clan_one_name == '')
    {
      catsJSON.clan_one_name = 'Undefined';
      $("#clan_one_name_input").val("Undefined");
      $("#clan_one_name").text("Undefined");
    }

    if (catsJSON.clan_two_name == '')
    {
      catsJSON.clan_two_name = 'Undefined';
      $("#clan_two_name_input").val("Undefined");
      $("#clan_two_name").text("Undefined");
    }

    if (catsJSON.clan_three_name == '')
    {
      catsJSON.clan_three_name = 'Undefined';
      $("#clan_three_name_input").val("Undefined");
      $("#clan_three_name").text("Undefined");
    }

    if (catsJSON.clan_four_name == '')
    {
      catsJSON.clan_four_name = 'Undefined';
      $("#clan_four_name_input").val("Undefined");
      $("#clan_four_name").text("Undefined");
    }

    if (catsJSON.clan_five_name == '')
    {
      catsJSON.clan_five_name = 'Undefined';
      $("#clan_five_name_input").val("Undefined");
      $("#clan_five_name").text("Undefined");
    }

    pushJSONtoAllegiencesHTML();

    saveGame();
  }

  editMode = !editMode;
}

var updateClanIcons = function()
{
  catsJSON.clan_one_icon = $("#clan_one_symbol_input").val();
  catsJSON.clan_two_icon = $("#clan_two_symbol_input").val();
  catsJSON.clan_three_icon = $("#clan_three_symbol_input").val();
  catsJSON.clan_four_icon = $("#clan_four_symbol_input").val();
  catsJSON.clan_five_icon = $("#clan_five_symbol_input").val();

  pushJSONtoAllegiencesHTML();

  saveGame();
}

var updateClanNames = function() {
  catsJSON.clan_one_name = $("#clan_one_name_input").val();
  catsJSON.clan_two_name = $("#clan_two_name_input").val();
  catsJSON.clan_three_name = $("#clan_three_name_input").val();
  catsJSON.clan_four_name = $("#clan_four_name_input").val();
  catsJSON.clan_five_name = $("#clan_five_name_input").val();

  if (catsJSON.clan_one_name == '')
  {
    catsJSON.clan_one_name = 'Undefined';
    $("#clan_one_name_input").val("Undefined");
    $("#clan_one_name").text("Undefined");
  }


  if (catsJSON.clan_two_name == '')
  {
    catsJSON.clan_two_name = 'Undefined';
    $("#clan_two_name_input").val("Undefined");
    $("#clan_two_name").text("Undefined");
  }

  if (catsJSON.clan_three_name == '')
  {
    catsJSON.clan_three_name = 'Undefined';
    $("#clan_three_name_input").val("Undefined");
    $("#clan_three_name").text("Undefined");
  }

  if (catsJSON.clan_four_name == '')
  {
    catsJSON.clan_four_name = 'Undefined';
    $("#clan_four_name_input").val("Undefined");
    $("#clan_four_name").text("Undefined");
  }

  if (catsJSON.clan_five_name == '')
  {
    catsJSON.clan_five_name = 'Undefined';
    $("#clan_five_name_input").val("Undefined");
    $("#clan_five_name").text("Undefined");
  }

  pushJSONtoAllegiencesHTML();

  saveGame();
}

var updateListName = function() {
  catsJSON.title = $("#list_name_input").val();

  if (catsJSON.title == '')
  {
    catsJSON.title = "No List Name";
    $("#list_name_input").val("No List Name");
    $(".list_name").text("No List Name");
  }

  pushJSONtoAllegiencesHTML();

  saveGame();
}

var findSiblings = function() {
  for (var i = 0; i < catsJSON.cats.length; i++)
  {
    var cat_i = catsJSON.cats[i];

    for (var j = 0; j < catsJSON.cats.length; j++)
    {
      var cat_j = catsJSON.cats[j];

      var mother_match = false;
      var father_match = false;

      if (cat_i.mother != "Unknown" && cat_i.mother >= 0 && cat_i.mother == cat_j.mother && cat_i.mother_type == cat_j.mother_type)
      {
        mother_match = true;
      }
      if (cat_i.father != "Unknown" && cat_i.father >= 0 && cat_i.father == cat_j.father && cat_i.father_type == cat_j.father_type)
      {
        father_match = true;
      }

      if (mother_match || father_match)
      {

        if (i != j)
        {
          //these two cats are siblings!
          addToArrayUnique(cat_i.siblings,j);
          addToArrayUnique(cat_j.siblings,i);

        }
      }
    }
  }
}

var findMates = function() {
  for (var i = 0; i < catsJSON.cats.length; i++)
  {
    var local_parent = catsJSON.cats[i];

    for (var j = 0; j < catsJSON.cats.length; j++)
    {
      var local_child = catsJSON.cats[j];

      if (local_child.father == i && local_child.father_type == "living")
      {
        if (local_child.mother >= 0 && local_child.mother_type == "living")
        {
          addToArrayUnique(local_parent.mates,local_child.mother);
        }
      }

      if (local_child.mother == i && local_child.mother_type == "living")
      {
        if (local_child.father >= 0 && local_child.father_type == "living")
        {
          addToArrayUnique(local_parent.mates,local_child.father);
        }
      }
    }
  }
}

var deleteCatByIndex = function(cat_index) {
  var cat_to_delete = catsJSON.cats[cat_index];

  //find siblings
  for (var i = 0; i < catsJSON.cats.length; i++)
  {
    var local_cat = catsJSON.cats[i];

    for (var j = 0; j < local_cat.siblings.length; j++)
    {
      if (local_cat.siblings[j] == cat_index)
      {
        local_cat.siblings.splice(j,1);
        j = 0;
      }
    }
  }

  //find mates
  for (var i = 0; i < catsJSON.cats.length; i++)
  {
    var local_cat = catsJSON.cats[i];

    for (var j = 0; j < local_cat.mates.length; j++)
    {
      if (local_cat.mates[j] == cat_index)
      {
        local_cat.mates.splice(j,1);
        j = 0;
      }
    }
  }

  //find apprentices
  for (var i = 0; i < catsJSON.cats.length; i++)
  {
    var local_cat = catsJSON.cats[i];

    if (local_cat.mentor == cat_index) { local_cat.mentor = -1; }
  }

  //find mentors
  for (var i = 0; i < catsJSON.cats.length; i++)
  {
    var local_cat = catsJSON.cats[i];

    if (local_cat.apprentice == cat_index) { local_cat.apprentice = -1; }
  }

  //find parents
  for (var i = 0; i < catsJSON.cats.length; i++)
  {
    var local_cat = catsJSON.cats[i];

    if (local_cat.father_type == "living" && local_cat.father == cat_index)
    {
      local_cat.father = "Unknown";
    }

    if (local_cat.mother_type == "living" && local_cat.mother == cat_index)
    {
      local_cat.mother = "Unknown";
    }
  }

  //find children
  for (var i = 0; i < catsJSON.cats.length; i++)
  {
    var local_cat = catsJSON.cats[i];

    for (var j = 0; j < local_cat.children.length; j++)
    {
      if (local_cat.children[j] == cat_index)
      {
        local_cat.children.splice(j,1);
        j = 0;
      }
    }
  }

  catsJSON.cats[cat_index] = { "name":"deleted", "allegience":"n/a", "rank":"n/a", "sex":"n/a", "moons":0, "mentor":"Unknown", "father":"Unknown", "mother":"Unknown", "mother_type":"living", "father_type":"living", "flavor_descriptor":"n/a", "color":"n/a", "additional_descriptor":"n/a", "apprentice":-1, "picture":"color_default.jpg", "children":[], "siblings":[], "mates":[], "name_color":"black" };

  pushJSONtoAllegiencesHTML();

  saveGame();
}

var addToArrayUnique = function(array_name, item_to_add)
{
  for (var i = 0; i < array_name.length; i++)
  {
    if (array_name[i] == item_to_add)
    {
      return false;
    }
  }

  array_name.push(item_to_add);

  return true;
}

var removeFromArray = function(array_name, item_to_remove)
{
  var found_item = false;

  for (var i = 0; i < array_name.length; i++)
  {
    if (array_name[i] == item_to_remove)
    {
      array_name.splice(i,1);
      i = 0;

      found_item = true;
    }
  }

  return found_item;
}

var loadCatsJSON = function() {
  catsJSON = JSON.parse(localStorage.getItem('catsJSON'));

  dead_mothers = JSON.parse(localStorage.getItem('dead_mothers'));
  dead_fathers = JSON.parse(localStorage.getItem('dead_fathers'));
}

var updateFromWindow = function() {
  loadCatsJSON();

  pushJSONtoAllegiencesHTML();
}

var editCatByIndex = function(index) {
  saveGame();
  window.open('editCat?catId='+index,'Edit Cat','left='+screen.width/2+',top=50,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800');
}


}
/*
     FILE ARCHIVED ON 20:46:23 Sep 04, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 11:42:36 Dec 22, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.597
  exclusion.robots: 0.03
  exclusion.robots.policy: 0.018
  esindex: 0.029
  cdx.remote: 26.31
  LoadShardBlock: 472.093 (3)
  PetaboxLoader3.datanode: 456.967 (5)
  PetaboxLoader3.resolve: 470.619 (3)
  load_resource: 473.863 (2)
*/