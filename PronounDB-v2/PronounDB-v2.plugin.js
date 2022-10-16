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

module.exports = (() => {
	const config = {
		info: {
			name: "PronounDB-v2",
			authors: [
				{
					name: "mtht",
					discord_id: "261178034587959317",
					github_username: "maxtrewartha",
					twitter_username: "sneetsnart",
				},
			],
			version: "0.0.1",
			description: "Shows you the pronoun of a user next to their name.",
			github: "https://github.com/maxtrewartha/BetterDiscordPlugins",
		},
		changelog: [
			{ title: "New Stuff", items: ["Added more settings", "Added changelog"] },
			{ title: "Bugs Squashed", type: "fixed", items: ["React errors on reload"] },
			{ title: "Improvements", type: "improved", items: ["Improvements to the base plugin"] },
			{
				title: "On-going",
				type: "progress",
				items: ["More modals and popouts being added", "More classes and modules being added"],
			},
		],
		main: "PronounDB-v2.plugin.js",
	};

	return !global.ZeresPluginLibrary
		? class {
				constructor() {
					this._config = config;
				}
				getName() {
					return config.info.name;
				}
				getAuthor() {
					return config.info.authors.map((a) => a.name).join(", ");
				}
				getDescription() {
					return config.info.description;
				}
				getVersion() {
					return config.info.version;
				}
				load() {
					BdApi.showConfirmationModal(
						"Library Missing",
						`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`,
						{
							confirmText: "Download Now",
							cancelText: "Cancel",
							onConfirm: () => {
								require("request").get(
									"https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js",
									async (error, response, body) => {
										if (error)
											return require("electron").shell.openExternal(
												"https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js"
											);
										await new Promise((r) =>
											require("fs").writeFile(
												require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"),
												body,
												r
											)
										);
									}
								);
							},
						}
					);
				}
				start() {}
				stop() {}
		  }
		: (([Plugin, Api]) => {
				const plugin = (Plugin, Library) => {
					const { Logger, Patcher, DiscordModules } = Library;

					return class PronounDBv2 extends Plugin {
						constructor() {
							super();
						}

						observer(e) {
							if (!e.addedNodes.length || !(e.addedNodes[0] instanceof Element)) return;
							if (e.addedNodes[0].querySelector("h3")) {
								let url = new URL(e.addedNodes[0].getElementsByTagName("img")[0].getAttribute("src"));
								let id = url.pathname.split("/")[2];
								Logger.log(id);
								e.addedNodes[0].getElementsByTagName("span")[1].innerText += ` [${id}]`;
							}
						}

						onStart() {
							Logger.log("Started");
							Patcher.before(Logger, "log", (t, a) => {
								a[0] = "Patched Message: " + a[0];
							});

							// Patcher.after(DiscordModules.MessageActions, "receiveMessage", (t, a) => {
							// 	Logger.log(JSON.stringify(t));
							// 	Logger.log(JSON.stringify(a));
							// });
						}

						onStop() {
							Logger.log("Stopped");
							Patcher.unpatchAll();
						}
					};
				};
				return plugin(Plugin, Api);
		  })(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/
