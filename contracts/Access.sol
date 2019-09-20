pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

contract Access {
    address public owner;
    bytes32 noID = 0;
    event IDK(bytes32 id);
    event HOPE(Member mem);

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

    modifier isOwner() {
        if (msg.sender == owner) _;
    }

    function getAccess() public view {
        require(msg.sender == owner, "Access not Granted!");
    }

    // function memberAccess(bytes32 _id) public view {
    //     require(memMap[_id].id != noID, "Member does not exist!");
    // }

    //     function researcherAccess(bytes32 _id) public view {
    //     require(rMap[_id].id != noID, "Researcher does not exist!");
    // }


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


    function help(uint256 _index) public {
        emit IDK(memList[_index].id);
        emit HOPE(memList[_index]);
    }

    

}
