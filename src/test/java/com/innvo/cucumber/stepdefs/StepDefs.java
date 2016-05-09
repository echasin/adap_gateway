package com.innvo.cucumber.stepdefs;

import com.innvo.AdapGatewayApp;

import org.springframework.boot.test.SpringApplicationContextLoader;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

@WebAppConfiguration
@ContextConfiguration(classes = AdapGatewayApp.class, loader = SpringApplicationContextLoader.class)
public abstract class StepDefs {

    protected ResultActions actions;

}