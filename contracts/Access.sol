pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

import "./provableAPI_0.5.sol";

contract Access is usingProvable {
    address public owner;
    bytes32 noID = 0;
    event IDK(bytes32 id);
    event HOPE(Member mem);
    event LogNewProvableQuery(string description);
    event Balance(uint amount, uint moneyNeeded);
    event QueryRes(string result);

    uint public last_completed_migration;
    uint public balance;

    struct Modification {
        string timeStamp;
        string modType;
    }

    struct Member {
        bytes32 id;
        string name;
        bool proxyUser;
        uint256[] mods;
        uint256[] mTime;
    }

    struct Researcher {
        bytes32 id;
        string name;
        uint256[] mods;
        uint256[] mTime;
    }

    string res;

    mapping(uint256=>string) modMap;
    mapping(bytes32=>Member) memMap;
    mapping(bytes32=>Researcher) rMap;


    mapping(string=>bool) memName;
    mapping(string=>bool) rName;
    Member[] memList;
    Researcher[] rList;

    constructor() public {
        owner = msg.sender;
        modMap[0] = "POST";
        modMap[1] = "PUT";
        modMap[2] = "GET";
        modMap[3] = "DELETE";
        addMember("ken", false);
        addResearcher("Danny");
    }

    function __callback(bytes32 myid, string memory result) public {
       if (msg.sender != provable_cbAddress()) revert("Not Enough Funds");
       result = result;
       emit QueryRes(res);
   }
   
    function() payable external {}


    modifier isOwner() {
        if (msg.sender == owner) _;
    }

    function getAccess() public view {
        require(msg.sender == owner, "Access not Granted!");
    }

    function memberAccess(string memory _name) public view {
        require(memName[_name], "Member does not exist!");
    }

    function researcherAccess(string memory _name) public view {
        require(rName[_name], "Researcher does not exist!");
    }

    function addMember( string memory _name, bool _proxy) public isOwner {
        bytes32 lunaID = keccak256(abi.encodePacked(_name, _proxy));
        uint256[] memory mods;
        Member memory newMember = Member(lunaID, _name, _proxy, mods, mods);
        memMap[lunaID] = newMember;
        memName[_name] = true;
        memList.push(newMember);
    }

  function addResearcher( string memory _name) public isOwner {
        bytes32 lunaID = keccak256(abi.encodePacked(_name));
        uint256[] memory mods;
        Researcher memory newResearcher = Researcher(lunaID, _name, mods, mods);
        rMap[lunaID] = newResearcher;
        rName[_name] = true;
        rList.push(newResearcher);
    }


    function queryDB() public payable {
       //emit Balance(address(this).balance, provable_getPrice("URL"));
       if (provable_getPrice("URL") > address(this).balance) {
           emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
       } else {
           emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
           provable_query("URL", "json(https://white-owl-58.localtunnel.me/users/1/Danny).name");
       }
   }


    function help(uint256 _index) public {
        emit IDK(memList[_index].id);
        emit HOPE(memList[_index]);
    }

    

}
