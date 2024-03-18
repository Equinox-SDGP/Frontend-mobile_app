import React  from "react"
import renderer from 'react-test-renderer';
import Devices from "@/app/devices"

describe("Devices",()=>{
    it("has 1 child",()=>{
        const tree = renderer.create(<Devices/>).toJSON();
        expect(tree.children.length).toBe(1);
    })
})