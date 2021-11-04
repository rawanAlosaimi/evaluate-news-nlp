function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('txt').value;

    if (Client.checkForText(formText)) {
        console.log("::: Form Submitted :::")

        postData('http://localhost:8081/sentimentAnalysis', { txt: formText })
            .then(function (res) {
                document.getElementById('model').innerHTML = res.model;
                document.getElementById('polarity').innerHTML = res.score_tag;
                document.getElementById("agreement").innerHTML = res.agreement;
                document.getElementById("subjectivity").innerHTML = res.subjectivity;
                document.getElementById("confidence").innerHTML = res.confidence;
                document.getElementById("irony").innerHTML = res.irony;
            })
    } else {
        alert('Please Enter your text!');
    }
}

//POST request to add the API data
const postData = async (txt = '', data = {}) => {
    console.log('Data is : ', data)
    const response = await fetch(txt, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

export { handleSubmit }