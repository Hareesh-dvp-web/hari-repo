
#include <stdio.h>
int main() {

    int arr[] = {2, 7, 11, 15};
    int target, i, j;
    printf("enter target");
    scanf("%d", &target);
    if (target <= 35) {
        for (i = 0; i < 4; i++) {
            for (j = i + 1; j < 4; j++) {
                if (arr[i] + arr[j] == target) {
                    printf("index locations are %d and %d\n" ,i, j);
                }
            }
        }
    }
    return 0;
}
