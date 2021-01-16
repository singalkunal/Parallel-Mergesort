#include <bits/stdc++.h>
using namespace std;
using namespace std::chrono; 

#include <omp.h>

void insertionsort_serial(int* arr, int arr_sz) {
    // cout<<arr_sz<<endl;
    for(int i=0; i<arr_sz; i++) {
        int cur = arr[i], j;
        for(j=i-1; j>=0 && arr[j] > cur; j--) {
            arr[j+1] = arr[j];
        }
        arr[j+1] = cur;
    }
}

void merge_serial(int* arr, int arr_sz, int* temp) {
    int i = 0, j = arr_sz/2, idx=0;

    while(i<arr_sz/2 && j<arr_sz) {
        if(arr[i] < arr[j]) temp[idx++] = arr[i++];
        else temp[idx++] = arr[j++];
    }

    while(i<arr_sz/2) temp[idx++] = arr[i++];
    while(j<arr_sz) temp[idx++] = arr[j++];


    memcpy(arr, temp, arr_sz * sizeof(int));
}

void mergesort_serial(int* arr, int arr_sz, int* temp, int thresh) {
    if(arr_sz <= thresh) {
        insertionsort_serial(arr, arr_sz);
        return;
    }

    mergesort_serial(arr, arr_sz/2, temp, thresh);
    mergesort_serial(arr+arr_sz/2, arr_sz - arr_sz/2, temp+arr_sz/2, thresh);

    merge_serial(arr, arr_sz, temp);
}

void mergesort_parallel(int* arr, int arr_sz, int* temp, int thresh, int num_threads) {
    if(num_threads == 1) mergesort_serial(arr, arr_sz, temp, thresh);
    else  {
#pragma omp parallel sections
        {
#pragma omp section
            {
                mergesort_parallel(arr, arr_sz/2, temp, thresh, num_threads/2);
            }

#pragma omp section
            {
                mergesort_parallel(arr+arr_sz/2, arr_sz-arr_sz/2, temp+arr_sz/2, thresh, num_threads-num_threads/2);
            }
        }


        merge_serial(arr, arr_sz, temp);
    }
}

int* generateArray(int arr_sz) {
    srand(314159);
    int* arr = new int[arr_sz];
    for(int i=0; i<arr_sz; i++) {
        arr[i] = rand() % arr_sz;
    }

    return arr;
}

int isSorted(int* arr, int arr_sz) {
    bool f = 1;
    for(int i=1; i<arr_sz; i++) {
        f &= arr[i]>=arr[i-1];
    }
    return f;
}

int main(){
    int arr_sz, num_threads, thresh;
    cin>>arr_sz >> num_threads >> thresh;

    omp_set_num_threads(num_threads);
    
    int* arr = generateArray(arr_sz);
    int* temp = new int[arr_sz];
    // double start = get_time();
    int f=isSorted(arr, arr_sz);

    // for(int i=0; i<arr_sz; i++) printf("%d ", arr[i]);
    printf("initial sorted? %d\n", f);
    auto start = high_resolution_clock::now(); 
    omp_set_nested(1);
    mergesort_parallel(arr, arr_sz, temp, thresh, num_threads);
    // mergesort_serial(arr, arr_sz, temp, thresh);
    f = isSorted(arr, arr_sz);
    auto stop = high_resolution_clock::now(); 
    auto duration = duration_cast<milliseconds>(stop - start); 
    printf("final sorted? %d\n", f);
    cout<<"Time taken to sort: "<<1e-3*duration.count()<<" seconds {{"<<num_threads<<" threads}}\n";

    // for(int i=0; i<arr_sz; i++) printf("%d ", arr[i]);
    // printf("Time taken by serial mergesort: %f\n", get_time() - start);
}

