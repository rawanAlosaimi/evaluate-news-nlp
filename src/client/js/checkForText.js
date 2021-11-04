function checkForText(formText) {
    console.log("::: Running checkForText :::", formText);
    if (formText === "") {
        return false;
    }
    return true;
}

export { checkForText }
