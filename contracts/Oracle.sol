pragma solidity >=0.4.21 <0.6.0;
//import "github.com/provable-things/ethereum-api/provableAPI_0.5.sol";
import "./provableAPI_0.5.sol";


contract Oracle is usingProvable  {
  address payable public owner;
  uint public last_completed_migration;
  uint public balance;
   bytes32 public returnHash;
   string public ETHUSD;
   event LogConstructorInitiated(string nextStep);
   event LogPriceUpdated(string price);
   event LogNewProvableQuery(string description);
   event Balance(uint amount, uint moneyNeeded);
   //event ETHNeeded(uint amount);


    constructor() public {
        owner = msg.sender;
        emit LogConstructorInitiated("Constructor was initiated. Call 'updatePrice()' to send the Provable Query.");
    }

   function __callback(bytes32 myid, string memory result) public {
       if (msg.sender != provable_cbAddress()) revert();
       ETHUSD = result;
       returnHash = keccak256(abi.encodePacked(result));
       emit LogPriceUpdated(result);
   }
   
   function() external payable {}

   function updatePrice() public payable {
       emit Balance(address(this).balance, provable_getPrice("URL"));
       if (provable_getPrice("URL") > address(this).balance) {
           emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
       } else {
           emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
           provable_query("URL", "json(https://great-octopus-97.localtunnel.me/users/1/Danny).name");
       }
   }
   
   function getNews() public payable  {
       emit Balance(address(this).balance, provable_getPrice("URL"));
       if (provable_getPrice("URL") > address(this).balance) {
           emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
       } else {
           emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
           provable_query("URL", "xml(http://rss.cnn.com/rss/cnn_topstories.rss).rss.channel.item.0.title");
       }
   }

   function getHash() public view returns (bytes32 dataHash) {
       return returnHash;
   }

}