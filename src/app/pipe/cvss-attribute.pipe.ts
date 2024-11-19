import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: "cvssAttribute",
    standalone: true,
})
export class CvssAttribute implements PipeTransform {
    transform(metrics: any, attribute: string) {
        if (metrics) {
            const key = Object.keys(metrics)[0];
            if ('exploitabilityScore' === attribute || attribute === 'impactScore' ||  attribute === 'source') {
                return metrics[key][0][attribute];
            }
            return metrics[key][0]?.cvssData[attribute]
        } else {
            return 'NA';
        }
    }
}
