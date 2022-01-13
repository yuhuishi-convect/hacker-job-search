exports = async function searchJobs(payload, response) {

    // search the db
    const mongodb = context.services.get("RealmCluster");
    const jobCollection = mongodb.db("hacker-job").collection("jobs");
    const indexName = "job-index";

    const query = payload.query.query;

    const agg = [
        {
            $search: {
                text: {
                    query: query,
                    path: {
                        'wildcard': '*'
                    }
                },
                highlight: {
                    path: "description",
                    maxNumPassages: 2
                },
                index: indexName
            }
        },
        {
            $project: {
                "_id": 1,
                "description": 1,
                "title": 1,
                "link": 1,
                "pubDate": 1,
                "guid": 1,
                "highlights": { "$meta": "searchHighlights" }
            }
        },
    ];
    // run pipeline
    const result = await jobCollection.aggregate(agg);
    return result
}