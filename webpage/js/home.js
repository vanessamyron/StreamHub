$(document).ready(function() {
		$("#add-streamer").click(function() {
				$(this).attr({
						"id": "homepage",
						"src": "./photos/home.png",
						"alt": "Homepage button"
				});
				$("input").attr("placeholder","Type in Streamers name to search and add them");
				$(".streamers").remove();
		});
		$("#homepage").click(function() {
				$(this).attr({
						"id": "add-streamer",
						"src": "./photos/plus.png",
						"alt": "Add streamers button"
				});
		});
});
