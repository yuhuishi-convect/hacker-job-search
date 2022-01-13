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
        {
            $group: {
                _id: '$guid',
                description: { $first: '$description' },
                title: { $first: '$titile' },
                link: { $first: '$link' },
                pubDate: { $first: '$pubDate' },
                highlights: { $first: '$highlights' },
            }
        },
        {
            $set: {
                title: {
                    $slice: [
                        {
                            $split: ['$description', '\n']
                        },
                        1
                    ]
                },
                company: {
                    $slice: [
                        {
                            $split: ['$description', '|']
                        },
                        1
                    ]
                }
            }
        },
        {
            $sort: {
                'highlights.score': -1
            }
        }
    ];
    // run pipeline
    const result = await jobCollection.aggregate(agg);
    return result
}