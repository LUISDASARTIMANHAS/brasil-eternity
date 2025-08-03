(() => {
	window.brasil_Eternity_message = function message(title, msg) {
		const url = "https://pingobras-sg.glitch.me/api/brasilEternity/mensagem";
		const ipinfo = localStorage.getItem("ipinfo");
		const payload = {
			titulo: `BRASIL ETERNITY/${title.toUpperCase()}`,
			mensagem: msg,
			ipinfo: ipinfo,
		};
		const options = {
			method: "POST",
			mode: "cors",
			headers: {
				"content-type": "application/json;charset=utf-8",
				Authorization: getAuthorizationHeaderManutencao(),
			},
			body: JSON.stringify(payload),
		};

		fetch(url, options)
			.then((response) => {
				if (response.ok) {
					const headers = response.headers;
					const contentType = headers.get("Content-Type");
					console.log(contentType);

					if (contentType && contentType.includes("application/json")) {
						return response.json();
					} else {
						return response.text();
					}
				} else {
					return response.text().then((errorText) => {
						const errorMessage = `Statuscode: ${response.status} - ${errorText}`;
						throw new Error(errorMessage);
					});
				}
			})
			.then((data) => {
				console.log("DATA RESPONSE: ");
				console.log(data);
			})
			.catch((error) => console.debug(error));
	};

	function getAuthorizationHeaderManutencao() {
		const combined = `${window.env.encodedUser}:${window.env.encodedPassword}`;
		const doubleEncoded = btoa(btoa(combined));
		return `Basic ${doubleEncoded}`;
	}
})();
