import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Prelude "mo:base/Prelude";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";


actor Token {

    Debug.print("Hello");
    let owner : Principal = Principal.fromText("qc7wy-zus5l-ujo56-fej5m-2d4ht-mvlkh-4grr3-qldzn-y6bog-f67m3-lae");
    let totalsupply : Nat = 1000000000;
    let symbol : Text = "NTL";

    private  stable var balanceEntries : [(Principal , Nat)] = [];

    private  var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    if(balances.size() < 1){
            balances.put(owner, totalsupply);
        };
    


    public query func balanceOf(who : Principal): async Nat{
        
        let balance : Nat = switch (balances.get(who)){
            case null 0;
            case (?result) result;
        };

    return balance;
    };

    public query func getSymbol() : async Text{
        return symbol;
    };

    public shared(msg) func payOut() : async Text{

        if(balances.get(msg.caller) == null){
        let amount = 10000;
        let result = await transfer(msg.caller, amount);
        return result;
        }else{
            return "Already Claimed";
        }
    };

    public shared(msg) func transfer(to: Principal, amount : Nat) : async Text{
        let fromBalance = await balanceOf(msg.caller);
        if(fromBalance > amount){
            let newfrombalance : Nat = fromBalance - amount ;
            balances.put(msg.caller, newfrombalance);

            let tobalance = await balanceOf(to);
            let newtobalance = tobalance + amount;
            balances.put(to, newtobalance);
            return "success";
        }else{
            return "Insufficient Funds";
        }
    };


    system func preupgrade(){
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade(){
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(),1,Principal.equal, Principal.hash);

        if(balances.size() < 1){
            balances.put(owner, totalsupply);
        }

    };
};
