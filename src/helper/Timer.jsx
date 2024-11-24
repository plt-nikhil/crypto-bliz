
export function cowntDownTimer(endDate) {

    let days, hours, minutes, seconds;

    // days : "0",
    // hours : "00",
    // minutes : "00",
    // seconds : "00",

    endDate = new Date(endDate).getTime();

        if (isNaN(endDate)) {
            return;
        }
        let startDate = new Date();
        startDate = startDate.getTime();
        
        let timeRemaining = parseInt( (endDate - startDate) / 1000, 10 );
        
        if (timeRemaining >= 0) {
            days = parseInt( timeRemaining / 86400, 10) ;
            timeRemaining = ( timeRemaining % 86400);

            hours = parseInt( timeRemaining / 3600, 10);
            timeRemaining = ( timeRemaining % 3600);
            
            minutes = parseInt( timeRemaining / 60, 10);
            timeRemaining = (timeRemaining % 60);

            return { days:  days, hours : hours, minutes : minutes, seconds:  seconds };

        } else {
            
        return;
    }
}

