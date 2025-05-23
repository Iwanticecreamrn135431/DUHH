
window.onload = function() {
    getMeal();
};

function getMeal() {
    const date = getCurrentDate(); // 현재 날짜 가져오기
    const apiUrl = `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530051&MLSV_YMD=${date}&Type=json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const mealInfo = data['mealServiceDietInfo'][1]['row'][0]['DDISH_NM'];
            const mealList = mealInfo.split('<br/>');
            let mealHTML = '<h2>급식 정보</h2>';
            mealHTML += '<ul>';
            mealList.forEach(meal => {
                mealHTML += `<li>${meal}</li>`;
            });
            mealHTML += '</ul>';
            document.getElementById('mealInfo').innerHTML = mealHTML;
        })
        .catch(error => {
            console.error('Error fetching meal data:', error);
            document.getElementById('mealInfo').innerHTML = '<p>급식 정보를 가져오는 중 오류가 발생했습니다.</p>';
        });
}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // 월과 일이 한 자리 수인 경우 앞에 0을 추가
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}${month}${day}`;
}