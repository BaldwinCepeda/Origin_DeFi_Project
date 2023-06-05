// Import required packages
const { request, gql } = require('graphql-request')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Define an async function to make the GraphQL request and write the data to a CSV file
async function main() {
  // Define the GraphQL endpoint and query
  const endpoint = 'https://hub.snapshot.org/graphql'
  const query = gql` {
      proposals (
        first: 20,
        skip: 0,
        where: {
          space_in: ["ousdgov.eth"],
          state: "closed"
        },
        orderBy: "created",
        orderDirection: desc
      ) {
        id
        title
        body
        choices
        start
        end
        snapshot
        state
        author
        space {
          id
          name
        }
      }
    }
   
    `

  // Make the GraphQL request and log the response data
  const data = await request(endpoint, query)

  //Proposal ID: 
  //data['proposals'][0]['id']
  console.log(JSON.stringify(data['proposals'][0]['id'], undefined, 2))

  // Convert the data to CSV format and write to a file
  console.log("converting to csv...");
  const csvWriter = createCsvWriter({
    path: './Historical_Data/Proposals.csv',
    header: [
      { id: 'id', title: 'Proposal ID' },
      { id: 'title', title: 'Title' },
      { id: 'body', title: 'Body' },
      { id: 'choices', title: 'Choices' },
      { id: 'start', title: 'Start Block' },
      { id: 'end', title: 'End Block' },
      { id: 'snapshot', title: 'Snapshot #' },

    ]
  });



  for (i = 0; i < 19; i++) {

    const records = [
      {
        id: data['proposals'][i]['id'],
        title: data['proposals'][i]['title'],
        body: data['proposals'][i]['body'],
        choices: data['proposals'][i]['choices'],
        start: data['proposals'][i]['start'],
        end: data['proposals'][i]['end'],
        snapshot: data['proposals'][i]['snapshot']
      },
    ];
    await csvWriter.writeRecords(records).then(() => {
      console.log('...Done');
    });
  }




}

// Call the main function and log when it is finished
main().catch((error) => console.error(error))
console.log("end of program ");
