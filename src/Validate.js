function validateHeadline(headline) {
    // regular expression for checking if headline is more than 1 symbol and less than 30 (requirements)
    let reg = /^[a-zA-Z0-9]{1,30}$/

    if (!reg.test(headline))
        alert('Fill the headline field!')

    return reg.test(headline);

}

function validateAuthors(authors) {
    // regular expression for checking if author first/last names are more than 1 symbol and less than 20 (requirements)
    let reg = /^[a-zA-Z0-9]{1,20}$/

    // Checking for at least one author to be filled
    if (authors[0].lastName === "" || authors[0].firstName === "") {
        alert('Enter at least one Author!')
        return false
    }

    // Checking for all authors filled that they meet requirements
    for (let i = 0; i < authors.length; i++) {
        if (!reg.test(authors[i].firstName) || !reg.test(authors[i].lastName)) {
            alert('Authors\' First name and Last name should not exceed 20 symbols')
            return false
        }
    }

    return true
}

function validatePages(pages) {
    // Checking if pages field meets the requirements
    if (pages === "") {
        alert("Fill the Number of Pages Field!")
    } else if (parseInt(pages) <= 0) {
        alert('Number of pages should be positive number!')
    } else if (parseInt(pages) > 10000) {
        alert('Number of pages should not be more than 10000!')
    }

    return (parseInt(pages) > 0 && parseInt(pages) <= 10000);
}

function validatePublisher(publisher) {
    // regular expression for checking if publisher is not more than 30 symbols long
    const reg = /^[a-zA-Z0-9]{0,30}$/

    if (!reg.test(publisher))
        alert('The publisher should not exceed 30 symbols!')

    return reg.test(publisher);

}

function validateYear(year) {

    // Checking if year is either not filled (optional parameter) or if it is filled that it is more than 1800 (requirements)
    const valyear = year === "" || parseInt(year) >= 1800

    if (!valyear)
        alert('The year should be bigger than 1800')

    return valyear
}

function validatedateOfCirculation(dateOfCirculation, pubYear) {
    // regular expression for checking if date is in the right format dd.mm.yyyy
    const reg = /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.][0-9]{4}$/

    // if date is not filled, it is fine, as it is optional parameter
    if (dateOfCirculation === "") return true

    // checking for format
    if (!reg.test(dateOfCirculation)) {
        alert('Fill the date field in format dd.mm.yyyy')
        return false
    }
    // creating array of numeric dd, mm, yy
    const dmy = dateOfCirculation.split('.').map(Number)
    // checking if year of circulation date is more than 1800 and that it is not more than publication year
    if (dmy[dmy.length - 1] < 1800) {
        alert('Year of circulation should be bigger than 1800')
        return false
    } else if (dmy[dmy.length - 1] < parseInt(pubYear)) {
        alert('Year should not exceed the publishing date')
        return false
    }
    return true
}

/**
 * Function for ISBN validation based on
 * http://en.wikipedia.org/wiki/International_Standard_Book_Number
 * @param isbn the isbn number in the format of 10 or 13 digits
 * @returns true if isbn is not filled or if it is filled correctly
 */
function validateISBN(isbn) {

    if (isbn === "") return true;

    const ISBN = /^(?:\d{9}[\dXx]|\d{13})$/;

    const checksum = (isbn) => {

        // remove last digit (control digit)
        let number = isbn.slice(0, -1);

        // convert number to array (with only digits)
        number = number.split('').map(Number);

        // save last digit (control digit)
        const last = isbn.slice(-1);

        // calculation for 9-digit ISBN and 13-digit differ
        if (number.length === 9) {
            const lastDigit = (last !== 'X') ? parseInt(last, 10) : 'X';

            // providing calculation as mentioned in the article
            number = number.map((digit, index) => {
                return digit * (index + 1);
            });

            // calculate checksum from array
            const sum = number.reduce((a, b) => a + b);

            const controlDigit = sum % 11;

            const val = lastDigit === (controlDigit !== 10 ? controlDigit : 'X');

            return val ? val : alert('ISBN is not correct!')
        } else {
            // providing calculation as mentioned in the article
            number = number.map((digit, index) => {
                return digit * ((index + 1) % 2 === 0 ? 3 : 1);
            });
            // calculate checksum from array
            const sum = number.reduce((a, b) => a + b);

            const controlDigit = 10 - sum % 10;

            const val = parseInt(last) === (controlDigit !== 10 ? controlDigit : 0);

            return val ? val : alert('ISBN is not correct!')
        }

    };


    if (!ISBN.test(isbn)) {
        alert('Please, enter ISBN as 10 or 13 digit number!');
        return false;
    }

    return checksum(isbn);

}

function validateAll(headline, authors, pages, publisher, year, dateOfCirculation, isbn) {

    return validateHeadline(headline) && validateAuthors(authors) && validatePages(pages) &&
        validatePublisher(publisher) && validateYear(year) && validatedateOfCirculation(dateOfCirculation, year) && validateISBN(isbn)

}

export default validateAll