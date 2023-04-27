// Import required packages
const { request, gql } = require('graphql-request')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Define an async function to make the GraphQL request and write the data to a CSV file
async function main() {
    // Define the GraphQL endpoint and query
    const endpoint = 'https://hub.snapshot.org/graphql'
    const query = gql`
        {
            space(id: "ousdgov.eth") {
                id
                name
                about
                network
                symbol
                members
                avatar
                github
                website
                twitter
            }
        }
    `

    // Make the GraphQL request and log the response data
    const data = await request(endpoint, query)
    console.log(JSON.stringify(data, undefined, 2))

    // Convert the data to CSV format and write to a file
    console.log("converting to csv...");
    const csvWriter = createCsvWriter({
        path: './Historical_Data/About.csv',
        header: [
            {id: 'id', title: 'ID'},
            {id: 'name', title: 'Name'},
            {id: 'about', title: 'About'},
            {id: 'networks', title: 'Networks'},
            {id: 'symbol', title: 'Symbol'},
            {id: 'members', title: 'Members'},
            {id: 'avatar', title: 'Avatar'},
            {id: 'github', title: 'Github'},
            {id: 'website', title: 'Website'},
            {id: 'twitter', title: 'twitter'},
        ]
    });
    const records = [
        {
            id: data.space.id,
            name: data.space.name,
            about: data.space.about,
            network: data.space.network,
            symbol: data.space.symbol,
            members: data.space.members,
            avatar: data.space.avatar,
            github: data.space.github,
            website: data.space.website,
            twitter: data.space.twitter
        },
    ];
    await csvWriter.writeRecords(records).then(() => {
        console.log('...Done');
    });
}

// Call the main function and log when it is finished
main().catch((error) => console.error(error))
console.log("end of program ");
