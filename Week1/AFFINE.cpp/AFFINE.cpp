
#include <iostream>
#include <numeric>
#include <string>
using namespace std;

#define int long long 
#define NO_OF_CHAR 256

int a;
int b;
int m;
int a_inverse;

int find_a_inverse(){
    if(gcd(a,m)!=1) return -1;
    int ans=1;
    while(1){
        if(ans%a==0) break;
        ans+=m;
    }
    return ans/a;
}

void input(int n){
    cout<<"Input the value of a: ";
    cin>>a;
    cout<<"Input the value of b: ";
    cin>>b;
    cout<<"Input the value of m: ";
    cin>>m;
    a=a%m;
    b=b%m;
    a_inverse=find_a_inverse();
    if(a_inverse==-1){
        if(n%5==0) cout<<"HINT: a and b should be co-prime.\n";
        cout<<"Invalid Input Sorry :( \n";
        input(n+1);
    }
}

void encryptNumber(){
    while(true){
        cout<<"Input your number: ";
        int n;
        cin>>n;
        if(n<0){
            cout<<"Redirecting to menu...\n";
            break;
        }
        cout<<"Hey buddy, your answer is: "<<((a*n)%m +b)%m<<"\n";
    }
    cin.ignore();
}

void decryptNumber(){
    while(true){
        cout<<"Input your number: ";
        int n;
        cin>>n;
        if(n<0){
            cout<<"Redirecting to menu...\n";
            break;
        }
        else cout<<"Hey buddy, your answer is: "<<((a_inverse%m)*(n-b+m))%m<<"\n";
    }
    cin.ignore();
}

char encryptChar(char c){
    return (char)(((a*(c))%NO_OF_CHAR +b)%NO_OF_CHAR);
}

char decryptChar(char c){
    return (char)(((a_inverse%NO_OF_CHAR)*(c-b+NO_OF_CHAR))%NO_OF_CHAR);
}

void encryptString(){
    if(gcd(a,NO_OF_CHAR)==1){
        cout<<"Invalid a, change settings.\n"; input(0);
    }    while(true){
        cout<<"Input your Message: ";
        string s;
        getline(cin, s);
        if(s.empty()) break;
        for(unsigned int i=0;i<s.size();i++){
            s[i]=encryptChar(s[i]);
        }
        cout<<"Hiii, your encrypted message is: `"<<s<<"`\n";
    }
}

void decryptString(){
    while(true){
        cout<<"Input your encrypted Message: ";
        string s;
        getline(cin, s);
        if(s.empty()) break;
        for(unsigned int i=0;i<s.size();i++){
            s[i]=decryptChar(s[i]);
        }
        cout<<"Hiii, your decrypted message is: `"<<s<<"`\n";
    }
}

signed main(){
    input(0);
    while(true){
        cout<<"\n--- Affine Cipher Menu ---\n";
        cout<<"1. Encrypt String\n";
        cout<<"2. Decrypt String\n";
        cout<<"3. Encrypt Number\n";
        cout<<"4. Decrypt Number\n";
        cout<<"5. Reconfigure (Change a, b, m)\n";
        cout<<"6. Quit\n";
        cout<<"Enter your choice: ";

        int choice;
        cin>>choice;
        cin.ignore();

        switch(choice){
            case 1: cout<<"NOTE: ENTER NOTHING TO RETURN\n\n";encryptString(); break;
            case 2: cout<<"NOTE: ENTER NOTHING TO RETURN\n\n";decryptString(); break;
            case 3: cout<<"NOTE: ENTER ANY NEGATIVE NUMBER TO RETURN\n\n";encryptNumber(); break;
            case 4: cout<<"NOTE: ENTER ANY NEGATIVE NUMBER TO RETURN\n\n";decryptNumber(); break;
            case 5: input(0); break;
            case 6: cout<<"Goodbye!\n"; return 0;
            default: cout<<"Invalid choice. Try again.\n";
        }
    }
}