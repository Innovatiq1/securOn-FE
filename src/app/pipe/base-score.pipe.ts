import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: "baseScore",
    standalone: true,
})
export class BaseScore implements PipeTransform {
    transform(metrics: any, scoreType?: string) {
        const key = Object.keys(metrics)[0];
        if (scoreType === 'epss') {
            return metrics[key][0]?.exploitabilityScore
        }
               
        return metrics[key][0]?.cvssData?.baseScore
    }
}