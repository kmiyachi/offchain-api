pragma solidity >=0.4.21 <0.6.0;

import "./SafeMath.sol";

contract Organization {
    bytes32 orgID;
    address orgAdmin;
    address[] memberList;
    address[] researcherList;


    constructor(bytes32 _id) public {
        orgID = _id;
        orgAdmin = address(msg.sender);
    }


    modifier isOrgAdmin() {
        require(msg.sender == orgAdmin, "Sender is not the Organization Administrator");
        _;
    }

    function addMemberToOrg(address _memberAddr) public isOrgAdmin {
        memberList.push(_memberAddr);
    }

    function deleteUserFromOrganization(bytes32 _lunaId, bytes32 _orgId) public isOrgAdmin {
        //TBD
    }


    function addResearcherToOrg(address _memberAddr) public isOrgAdmin {
        memberList.push(_memberAddr);
    }


        function deleteResearcherFromOrg(address _memberAddr) public isOrgAdmin {
        //TBD
    }
}