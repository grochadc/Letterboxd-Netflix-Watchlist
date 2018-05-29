var obj = {"unit":883,"show_id":70299043,"show_title":"Attack on Titan","release_year":"2013","rating":"4.6","category":"Anime","show_cast":"Yuki Kaji, Yui Ishikawa, Marina Inoue, Daisuke Ono, Hiro Shimono, Hiroshi Kamiya, Keiji Fujiwara, Kish\u00f4 Taniyama, Romi Park, Ryota Ohsaka","director":"","summary":"For over a century, people have been living behind barricades to block out the giant Titans that threaten to destroy the human race. When a Titan destroys his hometown, young Eren Yeager becomes determined to fight back.","poster":"http:\/\/netflixroulette.net\/api\/posters\/70299043.jpg","mediatype":1,"runtime":"24 min"};

const picked = (({show_id,show_title,poster}) => ({ show_id,show_title,poster}))(obj);

console.log(picked);
