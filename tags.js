const express = require('express');
const request = require('request');
const app = express();

let url  = 'https://codeforces.com/api/user.status?handle=';
app.use(express.static('public'))
app.get('/',function(req,response){
    response.render('search_user.ejs');
}); 
app.set('view engine', 'ejs'); 
app.get('/tags',function(req,response){
 
    const fetchUser = req.query.userHandle;
    url += fetchUser ;
    request(url,function(error,res,body){
        if(!error && res.statusCode == 200){
            const parsed_data = JSON.parse(body);
            let tagWisePerformance = {
                dp:0,
                greedy:0,
                constructive_algorithms:0,
                interactive:0,
                math:0,
                brute_force:0,
                divide_and_conquer:0,
                dfs_and_similar:0,
                dsu:0,
                graphs:0,
                strings:0,
                number_theory:0,
                games:0,
                sortings:0,
                data_structures:0,
                binary_search:0,
                two_pointers:0,
                shortest_paths:0,
                geometry:0,
                bitmasks:0,
                trees:0,
                expression_parsing:0,
                implementation:0,
                ternary_search:0,
                combinatorics:0,
                hashing:0,
                string_suffix_structures:0,
                meet_in_the_middle:0,
                graph_matchings:0,
                chinese_remainder_theorem:0,
                _special:0,
                matrices:0,
                probabilities:0,
                fft:0,
                flows:0,
                __sat:0,
                schedules:0
            }; 

            let total = 0 ;
            let ACCEPTED = 0;
                // response.send(user);

            let output_print ;
            let not_important = 0 ;
            parsed_data['result'].forEach(element => {
                // response.send(element['id']);
                
                if(element['verdict'] === 'OK'){ 
                const problem_tag = element['problem']['tags'];
                not_important += problem_tag.length;
                problem_tag.forEach(function(problemTagItem){
                    let converted_problemTagItem = "";
                    for(let i = 0 ; i < problemTagItem.length ;i++ )
                        if(problemTagItem[i] >= 'a' && problemTagItem[i] <= 'z' )
                            converted_problemTagItem += problemTagItem[i];
                        else
                            converted_problemTagItem += "_" ;
                    tagWisePerformance[converted_problemTagItem]++;
                    output_print +=  converted_problemTagItem;
                    output_print += " "; 
                }); 
                ACCEPTED++;
                }
                total++;
            });
            const array_tags = [];
            const array_submissions_tag = [];
            for(let key in tagWisePerformance){ 
                // console.log(key);
                array_tags.push(key);
                array_submissions_tag.push(tagWisePerformance[key]);
                // console.log(tagWisePerformance[key]);
            }
            let acceptance = ACCEPTED/total ;
            acceptance *= 100.00;
            const user = parsed_data['result'][0]['author']['members'][0]['handle'];
            console.log(`All info of ${user}`);
            console.log(`Total submissions you made till date ${total}`);
            console.log(`Total number of accepted submissions ${ACCEPTED}`);
            console.log(`Your acceptance rate is  ${acceptance.toFixed(15)}`);  
            // response.send(output_print);
            response.render('codeforces_views',{
                ejs_data: tagWisePerformance,
                ejs_user: user,
                ejs_total: total,
                ejs_ACCEPTED: ACCEPTED,
                ejs_acceptance: acceptance, 
                ejs_array_tags : array_tags,    
                ejs_array_submissions : array_submissions_tag 
            });
        }    
        else
            return response.send('Sorry! page not found :(');
    });
});
const port = process.env.PORT || 8080;
app.listen(port,function(){
    return console.log(`Server up at - ${port}`);
});
