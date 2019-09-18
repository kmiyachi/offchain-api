pragma solidity >=0.4.21 <0.6.0;

contract Access {
    address public owner;
    bytes32 noID = 0;

    struct Modification {
    string timeStamp;
    string modType;
    }

    struct Member {
        bytes32 id;
        bool proxyUser;
        uint256[] mods;
        uint256[] mTime;
    }

    struct Researcher {
        bytes32 id;
        uint256[] mods;
        uint256[] mTime;
    }

    mapping(bytes32=>Member) memMap;
    mapping(bytes32=>Researcher) rMap;

    Member[] memList;
    Researcher[] rList;

    constructor() public {
        owner = msg.sender;
    }

    modifier isOwner() {
        if (msg.sender == owner) _;
    }

    function getAccess() public view {
        require(msg.sender == owner, "Access not Granted!");
    }

    function memberAccess(bytes32 _id) public view {
        require(memMap[_id].id != noID, "Member does not exist!");
    }

        function researcherAccess(bytes32 _id) public view {
        require(rMap[_id].id != noID, "Researcher does not exist!");
    }

    function addMember( string memory _name, bool _proxy) public isOwner {
        bytes32 lunaID = keccak256(abi.encodePacked(_name, _proxy));
        uint256[] memory mods;
        Member memory newMember = Member(lunaID, _proxy, mods, mods);
        memMap[lunaID] = newMember;
        memList.push(newMember);
    }

  function addResearcher( string memory _name) public isOwner {
        bytes32 lunaID = keccak256(abi.encodePacked(_name));
        uint256[] memory mods;
        Researcher memory newResearcher = Researcher(lunaID, mods, mods);
        rMap[lunaID] = newResearcher;
        rList.push(newResearcher);
    }

}
