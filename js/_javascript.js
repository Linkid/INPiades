(function(){
	var webappCache = window.applicationCache; // To update the cache
	
	function loaded()
	{
		var h2Title = document.querySelector("header strong");
		var connectionStatus = ((navigator.onLine) ? 'online' : 'offline');
		
        loader = document.getElementById("loader").style;
		h2Title.textContent = h2Title.textContent + " - currently: " + connectionStatus;
		document.title = document.title.replace(" | "," - currently: " + connectionStatus + " | ");
		
		switch(webappCache.status)
		{
			case 0:
				console.log("Cache status: Uncached");
				break;
			case 1:
				console.log("Cache status: Idle");
				break;
			case 2:
				console.log("Cache status: Checking");
				break;
			case 3:
				console.log("Cache status: Downloading");
				break;
			case 4:
				console.log("Cache status: Updateready");
				break;
			case 5:
				console.log("Cache status: Obsolete");
				break;
		}
	}

    function noupdateCache() {
        loader.display = "none";
        console.log("No update to cache found");
    }
    function doneCache() {
        loader.display = "none";
        console.log("Cache has finished downloading");
    }
    function progressCache() {
        loader.display = "table";
        console.log("Downloading cache...");
    }
	function updateCache()
	{
		webappCache.swapCache();
		console.log("Cache has been updated due to a change found in the manifest");
        loader.display = "none";
	}
	function errorCache()
	{
		console.log("You're either offline or something has gone horribly wrong.");
	}

	//window.addEventListener("load", loaded, false);
    webappCache.addEventListener("progress", progressCache, false);
    webappCache.addEventListener("cached", doneCache, false);
    webappCache.addEventListener("noupdate", noupdateCache, false);
	webappCache.addEventListener("updateready", updateCache, false);
	webappCache.addEventListener("error", errorCache, false);
})();
