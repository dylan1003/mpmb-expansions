var iFileName = "revised_draconic_bloodline.js";
RequiredSheetVersion("13.1.3");
// This file adds the Class Option revised draconic bloodline by DenhiQ from GM Binder to MPMB's Character Record Sheet

// Define the source
SourceList["DQGMB"] = {
  name: "DenhiQ GM Binder",
  abbreviation: "DQGMB",
  group: "GM Binder",
  url : "https://www.DQGMBinder.com/share/-MkKQPRCdZ4LiSLXwgwQ",
  date : "2023/10/04"
};

// Setting up arrays for easy reference to chosen dragon ancestry later
const dragonColours = ["Amethyst", "Black", "Blue", "Brass", "Bronze", "Copper", "Crystal", "Emerald", "Gold", "Green", "Purple", "Red", "Sapphire", "Silver", "Topaz", "White"];
const damageTypes = ["Acid", "Cold", "Fire", "Force", "Lightning", "Necrotic", "Poison", "Psychic", "Radiant", "Thunder"];

const dragonColourDmgMap = [["Amethyst", "Force"],["Black", "Acid"], ["Blue", "Lightning"], ["Brass", "Fire"], ["Bronze", "Lightning"], ["Copper", "Acid"]];
dragonColourDmgMap.concat([["Crystal", "Radiant"], ["Emerald", "Psychic"], ["Gold", "Fire"], ["Green", "Poison"], ["Purple", "Psychic"]]);
dragonColourDmgMap.concat([["Red", "Fire"], ["Sapphire", "Thunder"], ["Silver", "Cold"], ["Topaz", "Necrotic"], ["White", "Cold"]]);

const dragonChoices = ["amethyst dragon", "black dragon", "blue dragon", "brass dragon", "bronze dragon", "copper dragon", "crystal dragon", "emerald dragon", "gold dragon", "green dragon", "purple dragon", "red dragon", "sapphire dragon", "silver dragon", "topaz dragon", "white dragon"];

function buildDragonAncestryDesc(dragonAttributes) {
	var descArray = [];
	descArray[0] = "I have draconic ancestry with" + dragonAttributes[0] + " dragons, which are affiliated with " + dragonAttributes[1] + " damage";
	descArray[1] = "When interacting with dragons, if I can add my Proficiency Bonus, I can double it";
	return descArray;
};

var sCFeature1 = {
	name : "Dragon Ancestry",
	source : [["DQGMB", 1]],
	minlevel : 1,
	description : desc([
		'Choose a Draconic Ancestor using the "Choose Feature" button above',
		"When interacting with dragons, if I can add my Proficiency Bonus, I can double it"
	]),
	choices: dragonChoices,
	languageProfs : ["Draconic"],
	choiceDependencies : [{
		feature : "subclassfeature6",
		choiceAttribute : true,
		feature : "subclassfeature1.1",
		choiceAttribute : true
	}]
};

// Create properties for each choice in dragonData object
for(var i = 0; i < dragonChoices.length; i++){
	const propertyName = dragonChoices[i]; // Convert choice to a property name
	sCFeature1[propertyName] = {
		name: dragonColourDmgMap[i][0] + ' Dragon Ancestry',
		description: desc(buildDragonAncestryDesc(dragonColourDmgMap[i])),
		dependentChoices: dragonColourDmgMap[i][1].toLowerCase()
	}
};

var sCFeature1_1 = {
	name : "Draconic Resilience",
	source : [["DQGMB", 1]],
	minlevel : 1,
	description : desc([
		"When I am not wearing armor, my AC is 13 + Dexterity modifier",
		"My hit point maximum increases by an amount equal to my sorcerer level",
		"I gain resistance to the element my bloodline is affiliated with"
	]),
	calcChanges : {
		hp : function (totalHD) {
			if (classes.known.sorcerer) {
				return [classes.known.sorcerer.level, "Draconic Resilience (sorcerer level)"];
			}
		}
	},
	armorOptions : [{
		regExpSearch : /^(?=.*(dragon|draconic))(?=.*(hide|skin|scales|resilience)).*$/i,
		name : "Draconic Resilience",
		source : [["DQGMB", 1]],
		ac : 13,
		affectsWildShape : true
	}],
	armorAdd : "Draconic Resilience",
	choices : ["acid", "cold", "fire", "force", "lightning", "necrotic", "poison", "psychic", "radiant", "thunder"],
	choicesNotInMenu : true,
	"acid" : { dmgres : ["acid"] },
	"cold" : { dmgres : ["cold"] },
	"fire" : { dmgres : ["fire"] },
	"force" : { dmgres : ["force"] },
	"lightning" : { dmgres : ["lightning"] },
	"necrotic" : { dmgres : ["necrotic"] },
	"poison" : { dmgres : ["poison"] },
	"psychic" : { dmgres : ["psychic"] },
	"radiant" : { dmgres : ["radiant"] },
	"thunder" : { dmgres : ["thunder"] }				
};

var sCFeature1_2_Spells = {
	name : "Draconic Spells",
	source : [["DQGMB", 1]],
	minlevel : 1,
	description : desc([
		"Your connection to draconic magic instills you with innate magic",
		"All bloodlines know Draconic Spells, as well as spells associated with their element",
		"Each spell is a Sorcerer spell, and doesn't count towards your total number of spells known",
		"These spells can't be replaced when you gain a level in this class"
	]),
};

var sCFeature6;
var sCFeature14;
var sCFeature18;

var subclass = {
	regExpSearch : /^((?=.*(sorcerer|witch))(?=.*bloodline)|(?=.*dragon)(?=.*ancestor)).*$/i,
	subname : "Draconic Bloodline Revised",
	source : [["DQGMB", 1]],
	features : {
		"subclassfeature1" : sCFeature1,
		"subclassfeature1.1" : sCFeature1_1,
		"subclassfeature1.2" : sCFeature1_2_Spells,
		"subclassfeature6" : {
			name : "Elemental Affinity",
			source : [["DQGMB", 1]],
			minlevel : 6,
			description : desc([
				'Choose a Dragon Ancestor using the "Choose Feature" button above',
				"I add Cha mod for spell damage if matching my dragon's affiliated type",
				"I can spend 1 sorcery point to gain resistance to my dragon's affiliated type"
			]),
			additional : "optional: 1 sorcery point",
			choices : ["acid", "cold", "fire", "force", "lightning", "necrotic", "poison", "psychic", "radiant", "thunder"],
			choicesNotInMenu : true,
			"acid" : {
				name : "Acid Elemental Affinity",
				description : desc([
					"I add my Charisma modifier to one damage roll of a spell if it does acid damage",
					"When I do this, I can spend 1 sorcery point to gain acid resistance for 1 hour"
				]),
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/acid/i).test(fields.Damage_Type)) {
								output.extraDmg += What('Cha Mod');
							};
						},
						"Cantrips and spells that deal acid damage get my Charisma modifier added to their damage."
					],
					spellAdd : [
						function (spellKey, spellObj, spName) {
							if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "acid", "Cha", true);
						},
						"Cantrips and spells that deal acid damage get my Charisma modifier added to their damage."
					]
				}
			},
			"cold" : {
				name : "Cold Elemental Affinity",
				description : desc([
					"I add my Charisma modifier to one damage roll of a spell if it does cold damage",
					"When I do this, I can spend 1 sorcery point to gain cold resistance for 1 hour"
				]),
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/cold/i).test(fields.Damage_Type)) {
								output.extraDmg += What('Cha Mod');
							};
						},
						"Cantrips and spells that deal cold damage get my Charisma modifier added to their damage."
					],
					spellAdd : [
						function (spellKey, spellObj, spName) {
							if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "cold", "Cha", true);
						},
						"Cantrips and spells that deal cold damage get my Charisma modifier added to their damage."
					]
				}
			},
			"fire" : {
				name : "Fire Elemental Affinity",
				description : desc([
					"I add my Charisma modifier to one damage roll of a spell if it does fire damage",
					"When I do this, I can spend 1 sorcery point to gain fire resistance for 1 hour"
				]),
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/fire/i).test(fields.Damage_Type)) {
								output.extraDmg += What('Cha Mod');
							};
						},
						"Cantrips and spells that deal fire damage get my Charisma modifier added to their damage."
					],
					spellAdd : [
						function (spellKey, spellObj, spName) {
							if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "fire", "Cha", true);
						},
						"Cantrips and spells that deal fire damage get my Charisma modifier added to their damage."
					]
				}
			},
			"force" : {
				name : "Force Elemental Affinity",
				description : desc([
					"I add my Charisma modifier to one damage roll of a spell if it does force damage",
					"When I do this, I can spend 1 sorcery point to gain force resistance for 1 hour"
				]),
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/force/i).test(fields.Damage_Type)) {
								output.extraDmg += What('Cha Mod');
							};
						},
						"Cantrips and spells that deal force damage get my Charisma modifier added to their damage."
					],
					spellAdd : [
						function (spellKey, spellObj, spName) {
							if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "force", "Cha", true);
						},
						"Cantrips and spells that deal force damage get my Charisma modifier added to their damage."
					]
				}
			},
			"lightning" : {
				name : "Lightning Elemental Affinity",
				description : desc([
					"I add my Charisma modifier to one damage roll of a spell if it does lightning damage",
					"When I do this, I can spend 1 sorcery point to gain lightning resistance for 1 hour"
				]),
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/lightning/i).test(fields.Damage_Type)) {
								output.extraDmg += What('Cha Mod');
							};
						},
						"Cantrips and spells that deal lightning damage get my Charisma modifier added to their damage."
					],
					spellAdd : [
						function (spellKey, spellObj, spName) {
							if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "lightn\\.?|lightning", "Cha", true);
						},
						"Cantrips and spells that deal lightning damage get my Charisma modifier added to their damage."
					]
				}
			},
			"necrotic" : {
				name : "Necrotic Elemental Affinity",
				description : desc([
					"I add my Charisma modifier to one damage roll of a spell if it does necrotic damage",
					"When I do this, I can spend 1 sorcery point to gain necrotic resistance for 1 hour"
				]),
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/necrotic/i).test(fields.Damage_Type)) {
								output.extraDmg += What('Cha Mod');
							};
						},
						"Cantrips and spells that deal necrotic damage get my Charisma modifier added to their damage."
					],
					spellAdd : [
						function (spellKey, spellObj, spName) {
							if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "necrotic", "Cha", true);
						},
						"Cantrips and spells that deal necrotic damage get my Charisma modifier added to their damage."
					]
				}
			},
			"poison" : {
				name : "Poison Elemental Affinity",
				description : desc([
					"I add my Charisma modifier to one damage roll of a spell if it does poison damage",
					"When I do this, I can spend 1 sorcery point to gain poison resistance for 1 hour"
				]),
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/poison/i).test(fields.Damage_Type)) {
								output.extraDmg += What('Cha Mod');
							};
						},
						"Cantrips and spells that deal poison damage get my Charisma modifier added to their damage."
					],
					spellAdd : [
						function (spellKey, spellObj, spName) {
							if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "poison", "Cha", true);
						},
						"Cantrips and spells that deal poison damage get my Charisma modifier added to their damage."
					]
				}
			},
		"psychic" : {
				name : "Psychic Elemental Affinity",
				description : desc([
					"I add my Charisma modifier to one damage roll of a spell if it does psychic damage",
					"When I do this, I can spend 1 sorcery point to gain psychic resistance for 1 hour"
				]),
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/psychic/i).test(fields.Damage_Type)) {
								output.extraDmg += What('Cha Mod');
							};
						},
						"Cantrips and spells that deal psychic damage get my Charisma modifier added to their damage."
					],
					spellAdd : [
						function (spellKey, spellObj, spName) {
							if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "psychic", "Cha", true);
						},
						"Cantrips and spells that deal psychic damage get my Charisma modifier added to their damage."
					]
				}
			},
			"radiant" : {
				name : "Radiant Elemental Affinity",
				description : desc([
					"I add my Charisma modifier to one damage roll of a spell if it does radiant damage",
					"When I do this, I can spend 1 sorcery point to gain radiant resistance for 1 hour"
				]),
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/radiant/i).test(fields.Damage_Type)) {
								output.extraDmg += What('Cha Mod');
							};
						},
						"Cantrips and spells that deal radiant damage get my Charisma modifier added to their damage."
					],
					spellAdd : [
						function (spellKey, spellObj, spName) {
							if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "radiant", "Cha", true);
						},
						"Cantrips and spells that deal radiant damage get my Charisma modifier added to their damage."
					]
				}
			},
			"thunder" : {
				name : "Thunder Elemental Affinity",
				description : desc([
					"I add my Charisma modifier to one damage roll of a spell if it does thunder damage",
					"When I do this, I can spend 1 sorcery point to gain thunder resistance for 1 hour"
				]),
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/thunder/i).test(fields.Damage_Type)) {
								output.extraDmg += What('Cha Mod');
							};
						},
						"Cantrips and spells that deal thunder damage get my Charisma modifier added to their damage."
					],
					spellAdd : [
						function (spellKey, spellObj, spName) {
							if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "thunder", "Cha", true);
						},
						"Cantrips and spells that deal thunder damage get my Charisma modifier added to their damage."
					]
				}
			}
		},
		"subclassfeature14" : {
			name : "Dragon Wings",
			source : [["DQGMB", 1]],
			minlevel : 14,
			description : desc([
				"As a bonus action, unless armor is in the way, I can sprout dragon wings from my back",
				"I gain a fly speed equal to my current speed until I dismiss the wings as a bonus action"
			]),
			action : ["bonus action", " (start/stop)"],
			speed : { fly : { spd : "walk", enc : "walk" } }
		},
		"subclassfeature18" : {
			name : "Draconic Presence",
			source : [["DQGMB", 1]],
			minlevel : 18,
			description : desc([
				"As an action, I create 60-ft radius aura of awe/fear for concentration up to 1 minute",
				"All hostiles in this aura must make a Wis save or be charmed (awe) or frightened (fear)",
				"They make their saves at the beginning of their turns",
				"A creature that succeeds on the save is immune to my aura for 24 hours"
			]),
			additional : "5 sorcery points",
			action : ["action", ""]
		}
	}
};


AddSubClass("sorcerer", "draconic bloodline revised", subclass);