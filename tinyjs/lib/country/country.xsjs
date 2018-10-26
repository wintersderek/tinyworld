function saveCountry (countryData) {
	var connection = $.hdb.getConnection();
	var output = JSON.stringify(countryData);
	var fnCreateCountry = connection.loadProcedure("tinyworld.tinydb.procedures::createCountry");
	var result = fnCreateCountry({
		IM_COUNTRY : countryData.name,
		IM_CONTINENT : countryData.partof
	});
	
	connection.commit();
	connection.close();
	
	if (result && result.EX_CODE === 0){
		return output;
	} else {
		return result.EX_ERROR;
	}
}

var country = {
	name : $.request.parameters.get("name"),
	partof : $.request.parameters.get("continent")
};

$.response.contentType = "application/json";
$.response.setBody(saveCountry(country));