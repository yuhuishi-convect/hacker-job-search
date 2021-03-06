exports = async function autoComplete(payload, response) {

    // search the db
    const mongodb = context.services.get("RealmCluster");
    const jobCollection = mongodb.db("hacker-job").collection("jobs");
    const indexName = "auto";

    const query = payload.query.query;

    const agg = [
        {
            $search: {
                autocomplete: {
                    query: query,
                    path: "description"
                },
                highlight: {
                    path: "description",
                    maxNumPassages: 2
                },
                index: indexName
            }
        },
        { $limit: 5 },
        {
            $project: {
                "description": 1,
                "_id": 0,
                "highlights": { "$meta": "searchHighlights" }
            }
        }
    ];
    // run pipeline
    const result = await jobCollection.aggregate(agg);
    return result
}