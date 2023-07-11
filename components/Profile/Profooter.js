import React, { useState, useEffect } from "react";
import { Container, Row, Col, } from "react-bootstrap";
import Label from "../Shared/Label";

export default function Profooter(props) {
    const { userAvailable } = props;

    const [role, setRole] = useState("");
    const [perm, setPerm] = useState("");
    const [len, setLen] = useState(false);

    useEffect(() => {
        let a, b, c = [];
        if (userAvailable.roles?.length > 0) {
            a = userAvailable.roles?.map((x) => x.name);
            let d = (userAvailable.roles?.map((role) => role.modules?.map((module) => module.name)));
            d.forEach((e) => e.forEach((item) => c.push(item)));
            b = [...new Set(c)];
            if (b.length > 0) {
                setLen(true);
                setPerm(b.join())
            }
            else {
                setPerm("You have no permissions")
            }
            setRole(a.join());
        }
        else {
            setRole("No roles has been assigned")
        }
    }, [userAvailable]);


    return (
        <>
            <Container>
                <Row>
                    <Col md={3}>
                        <Label>Roles</Label>
                    </Col>
                    <Col>
                        <h6>{role}</h6>
                    </Col>
                </Row>
                <Row>

                </Row>
                {len && <Row>
                    <Col>
                        <Label>Permissions</Label>
                    </Col>
                    <Col>
                        <h6>{perm}</h6>
                    </Col>
                </Row>}

            </Container>
        </>
    )
}

