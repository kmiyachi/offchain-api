pragma solidity >=0.4.21 <0.6.0;

import "./SafeMath.sol";
import "./Member.sol";
import "./Researcher.sol";
import "./Organization.sol";

contract SysAdmin {
    bytes32 lunaID;
    string name;
    bool proxyUser;
    uint256[] modifications;
    uint256[] modTime;

    mapping(bytes32=>address) memberMap;
    mapping(bytes32=>address) researcherMap;
    mapping(bytes32=>address) orgMap;

    mapping(string=>bool) memberName;
    mapping(string=>bool) researcherName;


    struct Modification {
        string timeStamp;
        string modType;
    }


    /// @dev creates a user and stores it on the blockchain
    /// @param _email - email of the user
    /// @param _name - name of the user
    /// @param _proxy - whether the user is a proxy user or not
    /// @return - to be determined
    function createMember(string memory _email, string memory _name, bool _proxy) public {
        lunaID = keccak256(abi.encodePacked(_email, _name, _proxy));
        Member newMember = new Member(lunaID, _proxy);
        memberMap[lunaID] = address(newMember);
        memberName[_name] = true;
    }


    // ** Need to add memberName deletion
    function deleteMember(bytes32 _lunaID) public {
        delete memberMap[_lunaID];
    }

    function createOrganization(string memory _name, string memory _email, uint256 _orgType) public {
        bytes32 orgID = keccak256(abi.encodePacked(_email, _name, _orgType));
        //bytes32 orgID = lunaID;
        Organization newOrganization = new Organization(orgID);
        orgMap[orgID] = address(newOrganization);
    }

    function deleteOrganization (bytes32 _orgID) public{
        delete orgMap[_orgID];
    }
  
    function createResearcher(string memory _name) public {
        lunaID = keccak256(abi.encodePacked(_name));
        Researcher newResearcher = new Researcher(lunaID, _name);
        researcherMap[lunaID] = address(newResearcher);
        researcherName[_name] = true;
    }

    function deleteResearcher(bytes32 _lunaID) public {
        delete researcherMap[_lunaID];
    }

    // ----------------------------------------------- --------- --------------------------------------//
    // ----------------------------------------------- MODIFIERS --------------------------------------//
    // ----------------------------------------------- --------- --------------------------------------//

    modifier memberExists(bytes32 _lunaID) {
        require(memberMap[_lunaID] != address(0), "Member does not exist");
        _;
    }

    modifier isResearcher(bytes32 _lunaID) {
        require(researcherMap[_lunaID] != address(0), "Not a researcher");
        _;
    }

    modifier isOrgAdmin(bytes32 _lunaID) {
        require(orgMap[_lunaID] != address(0), "Not an organization admin");
        _;
    }

    modifier isSysAdmin(bytes32 _lunaID) {
        require(msg.sender == address(this), "Not the System Admin");
        _;
    }



}