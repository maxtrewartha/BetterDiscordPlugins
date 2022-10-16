/**
 * @name PronounDB v2
 * @author mtht
 * @description Shows you the pronoun of a user next to their name.
 * @version 0.0.1
 */

const Pronouns = {
	unspecified: null,
	hh: "He/Him",
	hi: "He/It",
	hs: "He/She",
	ht: "He/They",
	ih: "It/Him",
	ii: "It/Its",
	is: "It/She",
	it: "It/They",
	shh: "She/He",
	sh: "She/Her",
	si: "She/It",
	st: "She/They",
	th: "They/He",
	ti: "They/It",
	ts: "They/She",
	tt: "They/Them",
	any: "Any",
	other: "Other",
	ask: "Ask",
	avoid: "Avoid",
};

async function getPronouns(userid) {}

module.exports = class PronounDB_v2 {
	constructor(meta) {
		// Do stuff in here before starting
	}

	start() {
		// Called when the plugin is activated (including after reloads)
		BdApi.alert("Hello World!", "This is my first plugin!");
	}

	observer(event) {
		//console.log(event["addedNodes"][0].getAttribute("id"));
	}

	stop() {
		// Called when the plugin is deactivated
	}
};
