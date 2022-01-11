exports = async function readRss() {
    const Parser = require('rss-parser');
    const parser = new Parser();

    const url = 'https://hnrss.org/whoishiring/jobs'


    let feed = await parser.parseURL(url);
    console.log(feed.title);

    const posts = feed.items.map(item => {
        return {
            title: item.title,
            description: item.contentSnippet,
            pubDate: item.pubDate,
            link: item.link,
            guid: item.guid
        }
    });

    // insert into db 
    const mongodb = context.services.get("RealmCluster");
    const jobCollection = mongodb.db("hacker-job").collection("jobs");

    const res = await jobCollection.insertMany(
        posts, {ordered: false}
    )


    return res


}