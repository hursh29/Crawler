const ourRequest = new XMLHttpRequest();
let rating_map_wide = new Map();   
rating_map_wide['newbie'] = 0 ;
rating_map_wide['pupil'] = 0 ;
rating_map_wide['specialist'] = 0 ;
rating_map_wide['expert'] = 0 ;
rating_map_wide['candidate master'] = 0 ;
rating_map_wide['master'] = 0 ;
rating_map_wide['international master'] = 0 ;
rating_map_wide['international grandmaster'] = 0 ;
rating_map_wide['grandmaster'] = 0 ;
rating_map_wide['legendary grandmaster'] = 0 ;
let ourRatingMap = new Map();
for(let i = 0 ; i < 38 ; i++ )
    ourRatingMap[i] = 0 ; 

const url = `https://codeforces.com/api/user.ratedList?activeOnly=true`;
ourRequest.open('GET', url);
ourRequest.onload = function () {
    const ourData = JSON.parse(ourRequest.responseText);
    if (ourData['status'] != 'OK')
        return console.log("Sorry couldn't connect :(");
    renderHTML(ourData);
    insertData();
    insertAverage();
}  
var ctx = document.getElementById('allUsersChart').getContext('2d');
var allUsersPlot = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets:
            [ 
                {
                    label: 'rating based',
                    borderWidth: 0.25,
                    barThickness: 7,
                    hoverBorderColor: 'rgb(0, 0, 0)',
                    hoverBorderWidth: 1.5 ,
                    hoverBackgroundColor: 'rgb(74, 25, 250)',
                    backgroundColor: [],
                    borderColor: 'rgba(0, 0, 0,0.6)',
                    data: []
                }

            ]

    },
    options: {
    }
});
var ctx1 = document.getElementById('allUsersChartWide').getContext('2d');
var allUsersWidePlot = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: [],
        datasets:
            [ 
                {
                    label: 'rank based',
                    borderWidth: 0.25,
                    barThickness: 7,
                    hoverBorderColor: 'rgb(0, 0, 0)',
                    hoverBorderWidth: 3,
                    hoverBackgroundColor: 'rgb(74, 25, 250)',
                    backgroundColor: [],
                    borderColor: 'rgba(0, 0, 0,0.6)',
                    data: []
                }

            ]

    },
    options: {
    }
});
var sumRating = 0 ,count_users = 0 ;
function renderHTML(ourData) {
    ourData['result'].forEach(element => {  
        const user_rank = element['rank'];
        console.log(user_rank);
        let user_rating = element['rating'];
        sumRating += user_rating ;
        count_users ++ ;
        user_rating /= 100 ; 
        ourRatingMap[Math.round(user_rating)] +=1 ;
        rating_map_wide[user_rank] += 1 ;
        // const str = `<p> aadmi ${element["handle"]} ki rating  ${element['rank']} </p>`;
    });
}  

function insertAverage(){
    var average_rating = sumRating/count_users;
    average_rating = Math.round(average_rating);
    const str = `<p> Total number of active users are ${count_users} and <strong> average rating <strong>is ${average_rating} </p>`
    var selectingDiv = document.getElementById('userAverage');
    selectingDiv.insertAdjacentHTML('beforeEnd',str);
}


function insertData(){  
    addData(allUsersWidePlot,'newbie','#BAB5AB',rating_map_wide['newbie']);
    addData(allUsersWidePlot,'pupil','#7FFF7F',rating_map_wide['pupil']);
    addData(allUsersWidePlot,'specialist','#69FCF3',rating_map_wide['specialist']);
    addData(allUsersWidePlot,'expert','#337DFF',rating_map_wide['expert']);
    addData(allUsersWidePlot,'candidate master','#FF66FF',rating_map_wide['candidate master']);
    addData(allUsersWidePlot,'master','rgb(255, 153, 0)',rating_map_wide['master']);
    addData(allUsersWidePlot,'international master','#FFA333',rating_map_wide['international master']);
    addData(allUsersWidePlot,'grandmaster','#FF3333',rating_map_wide['grandmaster']);
    addData(allUsersWidePlot,'international grandmaster','rgb(255,8,0)',rating_map_wide['international grandmaster']);
    addData(allUsersWidePlot,'legendary grandmaster','rgb(90, 14, 14)',rating_map_wide['legendary grandmaster']);
    for ( key in ourRatingMap) { 
        addData(allUsersPlot,key*100,getColor(key),ourRatingMap[key]);
    }
} 
function getColor( parameter){
    if(parameter < 12)
        return '#BAB5AB' ;
    if(parameter < 14)
        return '#7FFF7F' ;
    if(parameter < 16)
        return '#69FCF3' ;
    if(parameter < 19)
        return '#337DFF' ;
    if(parameter < 21)
        return '#FF66FF' ;
    if(parameter < 23)
        return '#FFA333' ;
    if(parameter < 24)
        return 'rgb(255,133,0)' ;
    if(parameter < 26)
        return '#FF3333' ;
    if(parameter < 30)
        return 'rgb(255,8,0)' ;
    return 'rgb(90, 14, 14)';
}
 
function addData(chart, label, color, data) {
    chart.data.datasets[0].data.push(data);
    chart.data.labels.push(label);
    chart.data.datasets[0].backgroundColor.push(color);   
    chart.update();
}            
const initialize_tags = ['dp','greedy','constructive algorithms','interactive','math','brute force','divide and conquer','dfs and similar','dsu','graphs','strings','number theory','games','sortings','data structures','binary search','two pointers','shortest paths','geometry','bitmasks','trees','expression parsing','implementation','ternary search','combinatorics','hashing','string suffix structures','meet-in-the-middle','graph matchings',' chinese remainder theorem','*special','matrices','probabilities','fft','flows','schedules','2-sat'];

ourRequest.send();