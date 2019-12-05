pragma solidity >=0.4.21 <0.6.0;

import "./SafeMath.sol";

contract Researcher {
    bytes32 lunaID;
    string name;
    address[] researchers;
    uint256[] modifications;
    uint256[] modTime;


    struct Query {
        string timeStamp;
        string queryType;
    }

    Query[] queries;


    constructor(bytes32 _id, string memory _name) public {
        lunaID = _id;
        name = _name;
    }


    function searchData (string memory _query, string memory _timeStamp) public {
        queries.push(Query(_timeStamp, "Search"));
    }

    function retrieveData(bytes32[] memory _idList, uint256[] memory dataElements, string memory _timeStamp) public {
        queries.push(Query(_timeStamp, "Retrieve"));
    }

    function contactCohort(bytes32[] memory _idList, string memory _message,string memory _timeStamp) public {
         queries.push(Query(_timeStamp, "Contact"));
    }

}