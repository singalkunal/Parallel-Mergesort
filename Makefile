make:
	@g++ ./cpp/mergesort.cpp -fopenmp -o mergesort
	@./mergesort
	@rm mergesort ./cpp/inp