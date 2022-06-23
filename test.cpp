#include<iostream>
using namespace std;
int main(){
    int n;
    cin>>n;
    int a[1000];
    for(int i = 0; i<n; i++){
        cin>>a[i];
    }
    bool kt = true;
    if(n==2){
        if(a[1]==a[0]) kt = false;
    }
    if(n>2){
        for(int i = 2; i<n; i++){
            if((a[i] - a[i-1]) * (a[i-1] - a[i-2] <= 0)) {kt = false;}
        }
    }
    if(kt) cout<<"YES";
    else cout<<"NO";
    return 0;
}