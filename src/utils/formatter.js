import { ValueState,IndicationColor } from '@ui5/webcomponents-react'
export function formatExecutionStatus(status){
    switch (status) {
        case "03":
            return "In-Execution"
        case "02":
            return "Not Started"
        case "04":
            return "Completed"
        case "07":
            return "Ready for execution"
        default:
            return "Unknown";
    }

}

export function formatExecutionIcon(status){
    switch (status) {
        case "03":
            return "instance"
        case "02":
            return "alert"
        case "04":
            return "sys-enter"
        case "07":
            return "lateness"
        default:
            return "sys-help";
    }

}

export function formatExecutionState(status){
    switch (status) {
        case "03":
            return IndicationColor.Indication06
        case "04":
            return ValueState.Success;
        case "02":
            return ValueState.Error
        case "07":
            return ValueState.Warning
        default:
            return ValueState.Information
    }

}

export function formatDate(date){
    return new Date(Number(date.substr(0,4)),Number(date.substr(4,2)),Number(date.substr(6,2)),Number(date.substr(8,2)),Number(date.substr(10,2)),Number(date.substr(12,2))).toLocaleString();
}
